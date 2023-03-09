import express from "express";
import { check } from "express-validator";
import {
  getPlaceByPlaceId,
  getPlacesByUserId,
  createNewPlace,
  updatePlaceByPlaceId,
  deletePlaceByPlaceId,
} from "../controllers/places-controller.js";
import { checkAuth } from "../middleware/check-auth.js";
import { fileUpload } from "../middleware/file-upload.js";

const router = express.Router();

router
  .get("/:placeId", getPlaceByPlaceId)
  .get("/user/:userId", getPlacesByUserId);

router.use(checkAuth);

router
  .post(
    "/",
    fileUpload.single("image"),
    [
      check("title").not().isEmpty(),
      check("address").not().isEmpty(),
      check("description").isLength({ min: 5 }),
    ],
    createNewPlace
  )
  .patch(
    "/:placeId",
    [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
    updatePlaceByPlaceId
  )
  .delete("/:placeId", deletePlaceByPlaceId);

export { router as placeRouter };
