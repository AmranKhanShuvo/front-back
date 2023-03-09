import { HttpError } from "../models/http-error.js";
import { validationResult } from "express-validator";
import { Users } from "../models/user-model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await Users.find({}, "-password");
  } catch (err) {
    return next(new HttpError("Something went wrong.", 500));
  }

  res.status(200).json({ users });
};

const signupUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("invalid action.", 422));
  }

  const { name, email, password } = req.body;

  let verifyEmail;
  try {
    verifyEmail = await Users.findOne({ email: email });
  } catch (err) {
    return next(new HttpError("Something went wrong.", 500));
  }

  if (verifyEmail) {
    return next(new HttpError("Email already registered", 500));
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 10);
  } catch (err) {
    return next(new HttpError("Bcryptjs server error", 500));
  }

  const newUser = new Users({
    name,
    email,
    password: hashedPassword,
    image: req.file.path,
    places: [],
  });

  try {
    await newUser.save();
  } catch (err) {
    return next(new HttpError("Something went wrong.", 500));
  }

  let token;
  try {
    token = jwt.sign(
      { userId: newUser._id, userEmail: newUser.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
  } catch (err) {
    return next(new HttpError("JWT server error", 500));
  }

  res
    .status(201)
    .json({ userId: newUser._id, userEmail: newUser.email, token: token });
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  let findUser;
  try {
    findUser = await Users.findOne({ email: email });
  } catch (err) {
    return next(new HttpError("Something went wrong.", 500));
  }

  let comparePass = false;
  try {
    comparePass = await bcrypt.compare(password, findUser.password);
  } catch (err) {
    return next(new HttpError("Bcryptjs server error", 500));
  }

  if (!findUser || !comparePass) {
    return next(new HttpError("Could not find the user", 404));
  }

  let token;
  try {
    token = jwt.sign(
      { userId: findUser._id, userEmail: findUser.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
  } catch (err) {
    return next(new HttpError("JWT server error.", 500));
  }

  res
    .status(200)
    .json({ userId: findUser._id, userEmail: findUser.email, token: token });
};

export { getAllUsers, signupUser, loginUser };
