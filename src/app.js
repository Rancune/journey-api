import dotenv from "dotenv";
dotenv.config();
import { connectDatabase } from "./controllers/connectionDbController.js";
import express from "express";
import routerTravel from "./routes/travel.routes.js";
import flightTravel from "./routes/flight.routes.js";
import accommodationTravel from "./routes/accommodation.routes.js";
import routerBackOffice from "./routes/backoffice.routes.js";
import { loadFirebase } from "./controllers/firebaseController.js";
import { loadAmadeus } from "./controllers/amadeusController.js";
import cors from "cors";

//import { loadCacheController } from "./managers/cacheManager.js";

//For Test PURPOSE ONLY
// import { addUserTest } from "./controllers/test/addUserTestController.js"; // for test purpose
// import { addFlightTest } from "./controllers/test/addFlightTest.controller.js";
// import { addAccomodationTest } from "./controllers/test/addAccomodationTest.controller.js";
// import { addTravelTest } from "./controllers/test/addTravelTest.controller.js";

const app = express();
const port = 4000;

// app.use(
//   cors({
//     origin: [
//       process.env.FRONT_END_URL,
//       process.env.SOCKET_ADMIN_URL,
//       process.env.DEV_URL,
//     ],
//     credentials: true,
//   })
// );
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/travel", routerTravel);
app.use("/flight", flightTravel);
app.use("/hotels", accommodationTravel);
app.use("/back", routerBackOffice);
app.get("/toto", (req, res) => {
  res.send("toto");
});

const startApp = async () => {
  await connectDatabase();
  loadFirebase();
  loadAmadeus();

  // await loadCacheController();

  // await addUserTest(); // for test purpose
  // await addFlightTest(); // for test purpose
  // await addAccomodationTest(); // for test purpose
  // await addTravelTest(); // for test purpose

  app.listen(port, () => {
    console.log(`I AM LISTENNING THE SERVER ON PORT ${port}, WITNESS ME!`);
  });
};

startApp();
