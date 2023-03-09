import express from "express";
import { check } from "express-validator";
import {
  getAllUsers,
  loginUser,
  signupUser,
} from "../controllers/users-controller.js";
import { fileUpload } from "../middleware/file-upload.js";

const router = express.Router();

router
  .get("/", getAllUsers)
  .post(
    "/signup",
    fileUpload.single("image"),
    [
      check("name").not().isEmpty(),
      check("email").normalizeEmail().isEmail(),
      check("password").isLength({ min: 6 }),
    ],
    signupUser
  )
  .post("/login", loginUser);

export { router as userRouter };
