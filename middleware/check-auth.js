import jwt from "jsonwebtoken";
import { HttpError } from "../models/http-error.js";

const checkAuth = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("Authentication failed.", 401);
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    return next(new HttpError("Authentication failed.", 401));
  }
};

export { checkAuth };
