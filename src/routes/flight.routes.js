import express from "express";
import {
  addFlight,
  getFlights,
  getFlightById,
  updateFlight,
  deleteFlight,
} from "../controllers/flightController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

const flightTravel = express.Router();

flightTravel.use(authenticateUser); //Middleware pour vérifier que l'utilisateur est bien connecté et recuperé son id

//get all flight
flightTravel.get("/", getFlights);

//get flight by id
flightTravel.get("/:id", getFlightById);

//add flight
flightTravel.post("/", addFlight);

//update flight
flightTravel.put("/:id", updateFlight);

//delete flight
flightTravel.delete("/:id", deleteFlight);

export default flightTravel;
