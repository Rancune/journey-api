import express from "express";
import {
  addFlight,
  getFlights,
  getFlightById,
  updateFlight,
  deleteFlight,
} from "../controllers/flightController.js";
const flightTravel = express.Router();

//get all users
flightTravel.get("/", getFlights);

//get user by id
flightTravel.get("/:id", getFlightById);

//add user
flightTravel.post("/", addFlight);

//update user
flightTravel.put("/:id", updateFlight);

//delete user
flightTravel.delete("/:id", deleteFlight);

export default flightTravel;