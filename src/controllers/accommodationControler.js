//ICI c'est le CRUD du AccomodationController

import { JourneyAccomodation } from "../models/accommodation.model.js";
import { JourneyTravel as Travel } from "../models/travel.model.js";
import Amadeus from "amadeus";
import { amadeusInstance } from "./amadeusController.js";

//create CRUD for accomodations from accommodation.model.js

//Création d'un hébergement
const addAccommodation = async (req, res) => {
  const { name, address, city, country, zipCode, description, stars } =
    req.body;
  const journeyAccommodation = new JourneyAccomodation({
    name,
    address,
    city,
    country,
    zipCode,
    description,
    stars,
  });
  await journeyAccommodation.save();
  console.log(
    "########################### Accommodation saved ###########################"
  );
  res.send("Accommodation saved");
};

//Récupération de tous les hébergements
const getAccommodations = async (req, res) => {
  try {
    const { city, adults, checkInDate, checkOutDate } = req.query;
    if (!city || !adults || !checkInDate || !checkOutDate) {
      throw new Error("Missing City");
    }

    const { data } =
      await amadeusInstance.referenceData.locations.hotels.byCity.get({
        cityCode: city,
        radius: "5",
        radiusUnit: "KM",
      });

    console.log(
      "########################### Hotel List UP ###########################"
    );

    //parse json to get the hotel id
    const hotelID = data.map((hotel) => {
      return hotel.hotelId;
    });

    console.log(hotelID);

    const { result } = await amadeusInstance.shopping.hotelOffersSearch.get({
      hotelIds: hotelID.join(","),
      adults: adults,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      roomQuantity: 1,
    });

    console.log(
      "########################### Accommodations found by name ###########################"
    );
    console.log(result);

    res.send(result);
  } catch (error) {
    console.log(
      "######################################",
      error,
      "######################################"
    );
    res.status(400).json("c'est niete Camarade.");
  }
};

//Récupération d'un hébergement par son id
const getAccommodationById = async (req, res) => {
  try {
    const { name, adults, checkInDate, checkOutDate } = req.query;
    if (!name || !adults || !checkInDate || !checkOutDate) {
      throw new Error("Missing parameters");
    }

    const { data } = await amadeusInstance.shopping.hotelOffersSearch.get({
      hotelIds: name,
      adults: adults,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      roomQuantity: 1,
    });

    console.log(
      "########################### Accommodations found by id ###########################"
    );

    //save hotel in travel table
    const hotelTravel = await Travel.findById(" 62ff5a7f0ae5e8f08ab2467f");
    hotelTravel.accommodation = data;
    await hotelTravel.save();
    console.log(
      "########################### Accommodation saved ###########################"
    );

    res.send(data);
  } catch (error) {
    console.log(
      "######################################",
      error,
      "######################################"
    );
    res.status(400).json("wallah y a rien frr");
  }
};

//Modification d'un hébergement
const updateAccommodation = async (req, res) => {
  const { id } = req.params;
  const { name, address, city, country, zipCode, description, stars } =
    req.body;
  const accomodation = await JourneyAccomodation.findByIdAndUpdate(id, {
    name,
    address,
    city,
    country,
    zipCode,
    description,
    stars,
  });
  console.log(
    "########################### Accommodation updated ###########################"
  );
  res.send(accomodation);
};

//Suppression d'un hébergement
const deleteAccommodation = async (req, res) => {
  const { id } = req.params;
  await JourneyAccomodation.findByIdAndDelete(id);
  console.log(
    "########################### Accommodation deleted ###########################"
  );
  res.send("Accommodation deleted");
};

export {
  addAccommodation,
  getAccommodations,
  getAccommodationById,
  updateAccommodation,
  deleteAccommodation,
};
