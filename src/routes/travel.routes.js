import express from "express";
import { addTravel, getTravels, getTravelById, updateTravel, deleteTravel } from "../controllers/travelController.js";
const routerTravel = express.Router();




//get all users
routerTravel.get("/", getTravels);

//get user by id
routerTravel.get("/:id", getTravelById);

//add user
routerTravel.post("/", addTravel);

//update user
routerTravel.put("/:id", updateTravel);

//delete user
routerTravel.delete("/:id", deleteTravel);




export default routerTravel;
