import mongoose from "mongoose";

//create the model for coefficient
const coefficientSchema = new mongoose.Schema({
  coefficient: { type: Number, required: true },
  destination: { type: String, required: true },
  margin: { type: Number, required: true },
});

export const JourneyCoefficient = mongoose.model(
  "JourneyCoefficient",
  coefficientSchema
);
