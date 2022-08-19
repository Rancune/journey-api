import express from "express";
import {
  addFlight,
  getFlights,
  getFlightById,
  updateFlight,
  deleteFlight,
} from "../controllers/flightController.js";
import { validateUser } from "../middlewares/authMiddleware.js";


const flightTravel = express.Router();

flightTravel.use(validateUser);//Middleware pour vérifier que l'utilisateur est bien connecté et recuperé son id

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