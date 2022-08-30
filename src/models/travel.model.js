import { json } from "express";
import mongoose from "mongoose";
const { Schema } = mongoose;

const travelSchema = Schema({
  name: { type: String, required: false },
  description: { type: String },
  destination: { type: String, required: false },
  price: { type: Number, required: false },
  startDate: { type: Date, required: false },
  endDate: { type: Date, required: false },
  paid: { type: String, required: false },
  userId: { type: String, required: false },
  flight: { type: JSON, required: false },
  accommodation: { type: JSON, required: false },
  creationDate: { type: Date, required: false },
  paymentDate: { type: Date, required: false },
  pax: { type: Number, required: false },
});

export const JourneyTravel = mongoose.model("JourneyTravel", travelSchema);
//export default JourneyTravel;
