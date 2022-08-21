//ICI c'est le CRUD DES TRAVELS
import { JourneyTravel } from '../models/travel.model.js';  
import { amadeus } from "./amadeusController.js";

const { dataFlights } = {};
const { dataHotels } = {};


//Create Crud for travel from travel model 

    //create a travel with a flight and an accomodation
    const addTravelWithFlightAndAccomodation = async (req, res) => {
        
        const { departure, destination, departureDate, capacity, city, adults, checkInDate, checkOutDate} = req.query;
    
        try {

        //API CALL TO GET FLIGHTS
            try {
            if (!departure || !destination || !departureDate || !capacity) {
                throw new Error("Missing parameters");
            }
        
                const dataFlight = await amadeus.shopping.flightOffersSearch.get({
                    originLocationCode: departure,
                    destinationLocationCode: destination,
                    departureDate: departureDate,
                    adults: capacity,
                });
                
                console.log("########################### Flight found ###########################");

                

            } catch (error) {
                console.log(
                "#################^^^^^^#####################",
                error,
                "######################################"
                );
                res.status(400).json("wallah y a rien frr");
            }


            

            //API CALL TO GET HOTELS
            try{
                if (!city || !adults || !checkInDate || !checkOutDate ) {
                    throw new Error('Missing City');
                }

                const { data } = await amadeus.referenceData.locations.hotels.byCity.get({
                    cityCode: city,
                    radius: '5',
                    radiusUnit: 'KM',
                }             
                );

                console.log('########################### Hotel List UP ###########################');

                //parse json to get the hotel id
                const hotelID = data.map(hotel => {
                    return hotel.hotelId;
                }
                );

                console.log(hotelID);
            
                const  { dataHotels } = await amadeus.shopping.hotelOffersSearch.get({
                    hotelIds: hotelID.join(','),
                    adults: adults,
                    checkInDate: checkInDate,
                    checkOutDate: checkOutDate,
                    roomQuantity: 1
                }
                );
            
                console.log('########################### Accommodations found by name ###########################');
                console.log(result);

            

            } catch (error) {
            console.log(
                "######################################",
                error,
                "######################################"
            );
            res.status(400).json("c'est niete Camarade.");
            }




            //JSON TRAITEMENT FOR RESPONSE
            dataFlights.map(flight => {
                return {
                    departure: flight.departure.iataCode,
                    destination: flight.arrival.iataCode,
                    departureDate: flight.departureDate,
                    arrivalDate: flight.arrivalDate,
                    price: flight.price.total,
                    carrier: flight.carrierCode,
                    flightNumber: flight.flightNumber,
                    duration: flight.duration,           
                }
            }
            );

            dataHotels.map(hotel => {
                return {
                    name: hotel.hotel.name,
                    description: hotel.hotel.description,
                    price: hotel.price.total,
                    startDate: hotel.checkInDate,
                    endDate: hotel.checkOutDate,  
                    roomQuantity: hotel.roomQuantity,
                    hotelId: hotel.hotel.hotelId,
                    city: hotel.hotel.city.name,
                    image: hotel.hotel.image,
                    rating: hotel.hotel.rating,
                    amenities: hotel.hotel.amenities
                }
            }
            );



            
            //SAVE IN DATA BASE WITH FLIGHT AND ACCOMODATION AND USER ID

            //dont save if not flight found
            try {
                //create a new travel entry in database
                const travel = new Travel({
                startDate : departureDate,
                endDate : departureDate,
                paid : "Devis en cours",
                userId : req.user,
                flight : data,
                creationDate : new Date(),
                accomodation : dataHotels,
                flight : dataFlights
                });
            
                await travel.save();
                console.log("########################### Travel saved ###########################");


            } catch (error) {
                console.log(
                "#################^^^^^^#####################",
                error,
                "######################################"
                );
            }


            //send response to client
            res.send(result);

        } catch (error) {
            console.log(
            "#################^^^^^^#####################",
            error,
            "######################################"
            );
        }


          
          
    }


    

    //Create a travel
    const addTravel = async (req, res) => {
            const {
            name,
            description,
            price,
            startDate,
            endDate,
            paid
            } = req.body;
        
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
                paid: 'false',
       
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
    }

    //Get a travel by id
    const getTravelById = async (req, res) => {
        const { id } = req.params;
        const travel = await JourneyTravel.findById(id);
        console.log('########################### travel found ###########################');
        res.send(travel);
    }

    //Get a travel by user id
    const getTravelByUserId = async (req, res) => {
        const { userId } = req.user;
        const travels = await JourneyTravel.find({ userId });
        res.send(travels);
    }

    //Update a travel
    const updateTravel = async (req, res) => {
        const { id } = req.params;
        const { name, description, price, startDate, endDate, flightId, accomodationId, userId } = req.body;
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
        console.log('########################### travel updated ###########################');
        res.send(travel);
    }

    //Delete a travel
    const deleteTravel = async (req, res) => {
        const { id } = req.params;
        await JourneyTravel.findByIdAndDelete(id);
        console.log('########################### travel deleted ###########################');
        res.send('travel deleted');
    }

    export { addTravelWithFlightAndAccomodation,addTravel, getTravels, getTravelById, updateTravel, deleteTravel };
    





