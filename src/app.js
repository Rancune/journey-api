import dotenv from "dotenv";
dotenv.config(  { path: '../.env' } );
import { connectDatabase } from "./controllers/connectionDbController.js";
import express from "express";
import routerUser from "./routes/user.routes.js"
import routerTravel from "./routes/travel.routes.js";


//For Test PURPOSE ONLY
import { addUserTest } from "./controllers/test/addUserTestController.js";// for test purpose
import { addFlightTest } from "./controllers/test/addFlightTest.controller.js";
import { addAccomodationTest } from "./controllers/test/addAccomodationTest.controller.js";
import { addTravelTest } from "./controllers/test/addTravelTest.controller.js";


//const express = require('express')
const app = express()
const port = 3000
//const UserRoute = require ('./routes/userRoute.js');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/user', routerUser);
app.use('/travel', routerTravel);


const startApp = async () => {
  await connectDatabase();

  await addUserTest();// for test purpose
  await addFlightTest();// for test purpose
  await addAccomodationTest();// for test purpose
  await addTravelTest();// for test purpose


  app.listen(port, () => {
      console.log(`I AM LISTENNING THE SERVER ON PORT ${port}, WITNESS ME!`)
    }
  )

  
}

startApp();
