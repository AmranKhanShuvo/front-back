import express from "express";
import mongoose from "mongoose";
import fs from "fs";
import { HttpError } from "./models/http-error.js";
import { placeRouter } from "./routes/places-routes.js";
import { userRouter } from "./routes/users-routes.js";
import path from "path";

mongoose.set("strictQuery", false);
const app = express();
app.use(express.json());

app.use("/uploads/images", express.static(path.join("uploads", "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use("/api/users", userRouter);
app.use("/api/places", placeRouter);

app.use((req, res, next) => {
  return next(new HttpError("Could not find this route", 404));
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }

  res
    .status(error.code || 500)
    .json({ message: error.message || "An unknown error happened." });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@mycluster01.pijmioj.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("MongoDB server connected.");
    app.listen(process.env.PORT || 5000, () => {
      console.log("Backend server started.");
    });
  })
  .catch((err) => {
    console.log(err);
  });
