//ICI c'est le CRUD DES TRAVELS
import { JourneyTravel as Travel } from "../models/travel.model.js";
import { amadeusInstance } from "./amadeusController.js";

//Create Crud for travel from travel model

//create a travel with a flight and an accomodation
const addTravelWithFlightAndAccomodation = async (req, res) => {
  const {
    departure,
    destination,
    departureDate,
    capacity,
    city,
    adults,
    checkInDate,
    checkOutDate,
  } = req.query;

  try {
    //API CALL TO GET FLIGHTS

    if (!departure || !destination || !departureDate || !capacity) {
      throw new Error("Missing parameters");
    }

    const { data } = await amadeusInstance.shopping.flightOffersSearch.get({
      originLocationCode: departure,
      destinationLocationCode: destination,
      departureDate: departureDate,
      adults: capacity,
    });

    console.log(
      "########################### Flight found ###########################"
    );

    //JSON TRAITEMENT FOR RESPONSE
    const flightDatas = data.map((flight) => {
      return {
        flight: {
          id: flight.id,
          price: flight.price.total,
          itinaries: flight.itineraries, //comment recuperer un tableau dans un json
        },
      };
    });
    console.log(flightDatas[0]); //resultat final de la recherche des vols

    //API CALL TO GET HOTELS

    if (!city || !adults || !checkInDate || !checkOutDate) {
      throw new Error("Missing City");
    }

    const { body } =
      await amadeusInstance.referenceData.locations.hotels.byCity.get({
        cityCode: city,
        radius: "5",
        radiusUnit: "KM",
      });

    console.log(
      "########################### Hotel List UP ###########################"
    );

    const hotelIDs = JSON.parse(body);
    console.log(hotelIDs.data[0].hotelId);

    const { result } = await amadeusInstance.shopping.hotelOffersSearch.get({
      hotelIds: hotelIDs.data[0].hotelId,
      adults: adults,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      roomQuantity: 1,
    });

    console.log(
      "########################### Accommodations found by name ###########################"
    );
    //console.log(result);

    const hotelDatas = JSON.parse(JSON.stringify(result.data[0]));

    // const hotelsData = result.data.map(() => {
    //   return {
    //     name: hotel.name,
    //     description: hotel.hotel.description,
    //     // price: offers.price.total,
    //     // currency: offers.price.currency,
    //     // roomDescription: offers.room.description.text,
    //   };
    // });

    console.log(hotelDatas); //resultat final de la recherche des hotels

    // //SAVE IN DATA BASE WITH FLIGHT AND ACCOMODATION AND USER ID

    //dont save if not flight found
    try {
      //create a new travel entry in database
      const travel = new Travel({
        startDate: departureDate,
        endDate: departureDate,
        paid: "Devis en cours",
        userId: req.user,
        creationDate: new Date(),
        accomodation: hotelDatas,
        flight: flightDatas[0],
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

    const travelJson = { ...flightDatas[0], ...hotelDatas };

    console.log(travelJson);
    // //send response to client
    res.send(travelJson);
  } catch (error) {
    console.log(
      "#################^^^^^^#####################",
      error,
      "######################################"
    );
  }
};

//Create a travel
const addTravel = async (req, res) => {
  const { name, description, price, startDate, endDate, paid } = req.body;

  //   const user = await JourneyUser.findById(userId);
  //   const fligth = await JourneyFlight.findById(req.body.flightId);
  //   const accomodation = await JourneyAccomodation.findById(
  //     req.body.accomodationId
  //   );

  const travel = new JourneyTravel({
    name,
    description,
    price,
    startDate,
    endDate,
    paid: "false",
  });
  await travel.save();
  console.log(
    "########################### travel saved ###########################"
  );
  res.send("travel saved");
};

//Get all travels
const getTravels = async (req, res) => {
  const travels = await JourneyTravel.find();
  res.send(travels);
};

//Get a travel by id
const getTravelById = async (req, res) => {
  const { id } = req.params;
  const travel = await JourneyTravel.findById(id);
  console.log(
    "########################### travel found ###########################"
  );
  res.send(travel);
};

//Get a travel by user id
const getTravelByUserId = async (req, res) => {
  const { userId } = req.user;
  const travels = await JourneyTravel.find({ userId });
  res.send(travels);
};

//Update a travel
const updateTravel = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    price,
    startDate,
    endDate,
    flightId,
    accomodationId,
    userId,
  } = req.body;

  const travel = await JourneyTravel.findByIdAndUpdate(id, {
    name,
    description,
    price,
    startDate,
    endDate,
    flightId,
    accomodationId,
    userId,
  });
  console.log(
    "########################### travel updated ###########################"
  );
  res.send(travel);
};

//Delete a travel
const deleteTravel = async (req, res) => {
  const { id } = req.params;
  await JourneyTravel.findByIdAndDelete(id);
  console.log(
    "########################### travel deleted ###########################"
  );
  res.send("travel deleted");
};

export {
  addTravelWithFlightAndAccomodation,
  addTravel,
  getTravels,
  getTravelById,
  updateTravel,
  deleteTravel,
};
