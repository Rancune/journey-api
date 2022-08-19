import express from "express";
import {
    addAccommodation,
    getAccommodations,
    getAccommodationById,
    updateAccommodation,
    deleteAccommodation,
} from "../controllers/accommodationControler.js";
const accommodationTravel = express.Router();

//get all users
accommodationTravel.get("/", getAccommodations);

//get user by id
accommodationTravel.get("/:id", getAccommodationById);

//add user
accommodationTravel.post("/", getAccommodations);

//update user
accommodationTravel.put("/:id", updateAccommodation);

//delete user
accommodationTravel.delete("/:id", deleteAccommodation);

export default accommodationTravel;