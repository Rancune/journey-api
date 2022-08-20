//ICI c'est le CRUD DES TRAVELS
import { JourneyTravel } from '../models/travel.model.js';  
import { JourneyFlight } from '../models/flight.model.js';
import { JourneyAccomodation } from '../models/accommodation.model.js';


//Create Crud for travel from travel model 

    //create a travel with a flight and an accomodation
    const addTravelWithFlightAndAccomodation = async (req, res) => {
        const { departure, destination, departureDate, capacity, city, adults, checkInDate, checkOutDate} = req.query;
       
       //API CALL TO GET FLIGHT
        try {

          if (!departure || !destination || !departureDate || !capacity) {
            throw new Error("Missing parameters");
          }
      
      
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
            console.log("########################### Travel saved ###########################");


          } catch (error) {
            console.log(
              "#################^^^^^^#####################",
              error,
              "######################################"
            );
          }

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
        
            const  { result } = await amadeus.shopping.hotelOffersSearch.get({
                hotelIds: hotelID.join(','),
                adults: adults,
                checkInDate: checkInDate,
                checkOutDate: checkOutDate,
                roomQuantity: 1
            }
            );
          
            console.log('########################### Accommodations found by name ###########################');
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


        //JSON TRAITEMENT FOR RESPONSE



        
        //SAVE IN DATA BASE WITH FLIGHT AND ACCOMODATION AND USER ID




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
    





