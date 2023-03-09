import multer from "multer";
import { v1 } from "uuid";

const MIME_TYPE_MAP = {
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/png": "png",
};

const fileUpload = multer({
  limits: 50000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/images");
    },
    filename: (req, file, cb) => {
      const extension = MIME_TYPE_MAP[file.mimetype];
      cb(null, v1() + "." + extension);
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error("File extension is not valid.");
    cb(error, isValid);
  },
});

export { fileUpload };
