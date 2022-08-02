//ICI c'est le CRUD du FlightController

import { JourneyFlight as Flight } from "../models/flight.model.js";
import Amadeus from "amadeus";
import {
  getFromCache,
  makeCacheKey,
  setInCache,
} from "../managers/cacheManager.js";
const AMADEUS_CLIENT_ID = "***REMOVED***";
const AMADEUS_CLIENT_SECRET = "***REMOVED***";

const amadeus = new Amadeus({
  clientId: AMADEUS_CLIENT_ID,
  clientSecret: AMADEUS_CLIENT_SECRET,
});
//create CRUD for flights

//Création d'un vol
const addFlight = async (req, res) => {
  const {
    companyName,
    departureDate,
    arrivalDate,
    departureCity,
    arrivalCity,
  } = req.body;
  const journeyFlight = new Flight({
    companyName,
    departureDate,
    arrivalDate,
    departureCity,
    arrivalCity,
  });
  await journeyFlight.save();
  console.log(
    "########################### Flight saved ###########################"
  );
  res.send("Flight saved");
};

//Récupération de tous les vols
const getFlights = async (req, res) => {
  try {
    const { departure, destination, departureDate, capacity } = req.query;
    if (!departure || !destination || !departureDate || !capacity) {
      throw new Error("Missing parameters");
    }



    // const redis_key = makeCacheKey(
    //   "flights",
    //   `${departure}-${destination}-${departureDate}-${capacity}`
    // );
    // const cache = await getFromCache(redis_key);
    // // check if request result was cached recently
    // if (cache) {
    //   console.log("########################### Flight found in cache ###########################");
    //   return res.json(JSON.parse(cache));
    // }



    const { data } = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: departure,
      destinationLocationCode: destination,
      departureDate: departureDate,
      adults: capacity,
      //max: 1,
    });



    // send results
    // store in cache for 1 hour
   // await setInCache(redis_key, JSON.stringify(data), 60);

    res.send(data);
  } catch (error) {
    console.log(
      "#################^^^^^^#####################",
      error,
      "######################################"
    );
    res.status(400).json("wallah y a rien frr");
  }
};

//Récupération d'un vol par son id
const getFlightById = async (req, res) => {
  const { id } = req.params;
  const flight = await Flight.findById(id);
  console.log(
    "########################### Flight found ###########################"
  );
  res.send(flight);
};

//Modification d'un vol
const updateFlight = async (req, res) => {
  const { id } = req.params;
  const {
    companyName,
    departureDate,
    arrivalDate,
    departureCity,
    arrivalCity,
  } = req.body;
  const flight = await Flight.findByIdAndUpdate(id, {
    companyName,
    departureDate,
    arrivalDate,
    departureCity,
    arrivalCity,
  });
  console.log(
    "########################### Flight updated ###########################"
  );
  res.send(flight);
};

//Suppression d'un vol
const deleteFlight = async (req, res) => {
  const { id } = req.params;
  await Flight.findByIdAndDelete(id);
  console.log(
    "########################### Flight deleted ###########################"
  );
  res.send("Flight deleted");
};

export { addFlight, getFlights, getFlightById, updateFlight, deleteFlight };