import express from "express";
import {
  addTravelWithFlightAndAccomodation,
  addTravel,
  getTravels,
  getTravelById,
  updateTravel,
  deleteTravel,
} from "../controllers/travelController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

const routerTravel = express.Router();

routerTravel.use(authenticateUser); //Middleware pour vérifier que l'utilisateur est bien connecté et recuperé son id

//get Travel With Flight And Accomodation
routerTravel.get("/", getTravels);

//get travel by id
routerTravel.get("/:id", getTravelById);

//add travel
routerTravel.post("/", addTravelWithFlightAndAccomodation);

//update travel
routerTravel.put("/:id", updateTravel);

//delete travel
routerTravel.delete("/:id", deleteTravel);

export default routerTravel;
