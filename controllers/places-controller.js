import mongoose from "mongoose";
import { HttpError } from "../models/http-error.js";
import { getCoordsForAddress } from "../util/location.js";
import { validationResult } from "express-validator";
import { Places } from "../models/place-model.js";
import { Users } from "../models/user-model.js";
import fs from "fs";

const getPlaceByPlaceId = async (req, res, next) => {
  const placeId = req.params.placeId;

  let place;
  try {
    place = await Places.findById(placeId);
  } catch (err) {
    return next(new HttpError("Something went wrong.", 500));
  }

  if (!place) {
    return next(new HttpError("Place not found", 404));
  }

  res.json({ place });
};

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.userId;

  let userPlaces;
  try {
    userPlaces = await Users.findById(userId).populate("places");
  } catch (err) {
    return next(new HttpError("Something went wrong.", 500));
  }

  if (!userPlaces || userPlaces.length === 0) {
    return next(new HttpError("User not found", 404));
  }

  res.json({ places: userPlaces.places });
};

const createNewPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("invalid action.", 422));
  }
  const { title, address, description } = req.body;

  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  let verifyUser;
  try {
    verifyUser = await Users.findOne({ _id: req.userData.userId });
  } catch (err) {
    return next(new HttpError("Something went wrong.", 500));
  }

  if (!verifyUser) {
    return next(
      new HttpError("User is not authorized to create new place.", 404)
    );
  }

  const newPlace = new Places({
    title,
    address,
    description,
    image: req.file.path,
    creatorId: req.userData.userId,
    coordinates,
  });

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await newPlace.save({ session: session });
    verifyUser.places.push(newPlace);
    await verifyUser.save({ session: session });
    await session.commitTransaction();
  } catch (err) {
    return next(new HttpError("Something went wrong.", 500));
  }

  res.status(201).json({ newPlace });
};

const updatePlaceByPlaceId = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("invalid action.", 422));
  }

  const placeId = req.params.placeId;
  const { title, description } = req.body;

  let findPlace;
  try {
    findPlace = await Places.findById(placeId);
  } catch (err) {
    return next(new HttpError("Something went wrong.", 500));
  }

  if (findPlace.creatorId.toString() !== req.userData.userId) {
    return next(
      new HttpError("You're not authorized to edit this place.", 401)
    );
  }

  findPlace.title = title;
  findPlace.description = description;

  try {
    await findPlace.save();
  } catch (err) {
    return next(new HttpError("Something went wrong.", 500));
  }

  res.status(200).json({ place: findPlace });
};

const deletePlaceByPlaceId = async (req, res, next) => {
  const placeId = req.params.placeId;

  let findPlace;
  try {
    findPlace = await Places.findById(placeId).populate("creatorId");
  } catch (err) {
    return next(new HttpError("Something went wrong.", 500));
  }

  if (!findPlace) {
    return next(new HttpError("Could not find place", 404));
  }

  if (findPlace.creatorId._id.toString() !== req.userData.userId) {
    return next(
      new HttpError("You're not authorized to delete this place.", 401)
    );
  }

  const imagePath = findPlace.image;

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await findPlace.remove({ session: session });
    findPlace.creatorId.places.pull(findPlace);
    await findPlace.creatorId.save({ session: session });
    await session.commitTransaction();
  } catch (err) {
    return next(new HttpError("Something went wrong.", 500));
  }

  fs.unlink(imagePath, (err) => {
    console.log(err);
  });

  res.status(200).json({ message: "Successfully deleted." });
};

export {
  getPlaceByPlaceId,
  getPlacesByUserId,
  createNewPlace,
  updatePlaceByPlaceId,
  deletePlaceByPlaceId,
};
