import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  address: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  creatorId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
});

const Places = mongoose.model("Place", placeSchema);

export { Places };
