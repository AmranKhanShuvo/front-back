import axios from "axios";
import { HttpError } from "../models/http-error.js";
const API_KEY = process.env.GOOGLE_API_KEY; //fake google geocoding api.

const getCoordsForAddress = async (address) => {
  //   const response = await axios.get(
  //     `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
  //       address
  //     )}&key=${API_KEY}`
  //   );

  //   const data = response.data;

  //   console.log(data);

  //   if (!data || data.status === "ZERO_RESULTS") {
  //     throw new HttpError("invalid request.", 422);
  //   }

  //   const coordinates = data.results[0].geometry.location;

  //   return coordinates;

  return {
    lat: 45,
    lng: 66,
  };
};

export { getCoordsForAddress };
