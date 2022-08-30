import mongoose from "mongoose";
const { Schema } = mongoose;

const flightSchema = Schema({
  companyName: { type: String, required: true },
  departureDate: { type: Date, required: true },
  arrivalDate: { type: Date, required: true },
  departureCity: { type: String },
  arrivalCity: { type: String },
  itinary: { type: JSON },
  travel_id: { type: String, required: true },
  price: { type: Number, required: true },
});

export const JourneyFlight = mongoose.model("JourneyFlight", flightSchema);
