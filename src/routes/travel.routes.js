import express from "express";
import { addTravel, getTravels, getTravelById, updateTravel, deleteTravel } from "../controllers/travelController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

const routerTravel = express.Router();



routerTravel.use(authenticateUser);//Middleware pour vérifier que l'utilisateur est bien connecté et recuperé son id

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

//Send quotation
// routerTravel.post("/quotation", async (req, res) )=> {
//     try {
//         const quotation = await quotationController.create(req.body);
//         res.status(201).json(quotation);
//     }
//     catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// }


        




export default routerTravel;
