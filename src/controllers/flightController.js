//ICI c'est le CRUD du FlightController

import { JourneyFlight as Flight } from "../models/flight.model.js";
import { JourneyTravel as Travel } from "../models/travel.model.js";
import { amadeus } from "./amadeusController.js";
import {
  getFromCache,
  makeCacheKey,
  setInCache,
} from "../managers/cacheManager.js";


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
  const { departure, destination, departureDate, capacity} = req.query;
  try {
    
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

    //dont save if not flight found

    try {
      //create a new travel entry in database
      const travel = new Travel({
        startDate : departureDate,
        endDate : departureDate,
        paid : "Devis en cours",
        userId : req.user,
        flight : data,
        creationDate : new Date()
      });
    
      await travel.save();
      console.log(
        "########################### Travel saved ###########################"
      );
    } catch (error) {
      console.log(
        "#################^^^^^^#####################",
        error,
        "######################################"
      );
    }
   
   // store in cache for 1 hour
   // await setInCache(redis_key, JSON.stringify(data), 60);


  console.log("########################### Flight found ###########################");
  //traiter le json data pour renvoyer un seul vol
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