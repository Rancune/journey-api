import dotenv from "dotenv";
dotenv.config();
import { connectDatabase } from "./controllers/connectionDbController.js";
import express from "express";
import routerUser from "./routes/user.routes.js";
import routerTravel from "./routes/travel.routes.js";
import flightTravel from "./routes/flight.routes.js";
import { loadCacheController } from "./managers/cacheManager.js";

//For Test PURPOSE ONLY
// import { addUserTest } from "./controllers/test/addUserTestController.js"; // for test purpose
// import { addFlightTest } from "./controllers/test/addFlightTest.controller.js";
// import { addAccomodationTest } from "./controllers/test/addAccomodationTest.controller.js";
// import { addTravelTest } from "./controllers/test/addTravelTest.controller.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", routerUser);
app.use("/travel", routerTravel);
app.use("/flight", flightTravel);

const startApp = async () => {
  try {
      await connectDatabase();
      // await loadCacheController();
    } catch (error) {
      console.log(error);
    }
    
    
    // await addUserTest(); // for test purpose
    // await addFlightTest(); // for test purpose
    // await addAccomodationTest(); // for test purpose
    // await addTravelTest(); // for test purpose
    
    app.listen(port, () => {
      console.log(`I AM LISTENNING THE SERVER ON PORT ${port}, WITNESS ME!`);
    });
};

startApp();

//const RancuneConsole = (text) => process.env.DEBUG && console.log(text);