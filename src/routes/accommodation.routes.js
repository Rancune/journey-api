import express from "express";
import {
  addAccommodation,
  getAccommodations,
  getAccommodationById,
  updateAccommodation,
  deleteAccommodation,
} from "../controllers/accommodationControler.js";
const accommodationTravel = express.Router();

//get all Hotels
accommodationTravel.get("/", getAccommodations);

//get Hotel by id
accommodationTravel.get("/:id", getAccommodationById);

//add Hotel
accommodationTravel.post("/", getAccommodations);

//update Hotels
accommodationTravel.put("/:id", updateAccommodation);

//delete Hotels
accommodationTravel.delete("/:id", deleteAccommodation);

export default accommodationTravel;
