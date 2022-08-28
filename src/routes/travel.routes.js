import express from "express";
import {
  addTravelWithFlightAndAccomodation,
  addTravel,
  getTravels,
  getTravelById,
  getTravelByUserId,
  updateTravel,
  deleteTravel,
} from "../controllers/travelController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

const routerTravel = express.Router();

routerTravel.use(authenticateUser); //Middleware pour vérifier que l'utilisateur est bien connecté et recuperé son id

//get Travel With Flight And Accomodation
routerTravel.get("/", getTravelByUserId);

//get travel by id
routerTravel.get("/:id", getTravelById);

//get quotation travel
routerTravel.post("/", addTravelWithFlightAndAccomodation);

//get all travel of a user
routerTravel.get("/:uid", getTravelByUserId);

//update travel
routerTravel.put("/:id", updateTravel);

//delete travel
routerTravel.delete("/:id", deleteTravel);

export default routerTravel;
