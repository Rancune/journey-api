import express from "express";
import { addUser, getUsers, getUserById, updateUser, deleteUser } from "../controllers/userControllers.js";
const routerUser = express.Router();




//get all users
routerUser.get("/", getUsers);

//get user by id
routerUser.get("/:id", getUserById);

//add user
routerUser.post("/", addUser);

//update user
routerUser.put("/:id", updateUser);

//delete user
routerUser.delete("/:id", deleteUser);




export default routerUser;







