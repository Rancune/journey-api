import express from "express";
import {
  addCoefficient,
  getCoefficients,
  updateCoefficient,
} from "../controllers/backOfficeController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

const routerBackOffice = express.Router();

//routerBackOffice.use(authenticateUser); //Middleware pour vérifier que l'utilisateur est bien connecté et recuperé son id

//get coeff
routerBackOffice.get("/", getCoefficients);

//add coeff
routerBackOffice.post("/", addCoefficient);

//update coeff
routerBackOffice.put("/:id", updateCoefficient);

export default routerBackOffice;

//Create router for coefficient
