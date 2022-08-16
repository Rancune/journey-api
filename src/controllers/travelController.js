//ICI c'est le CRUD DES TRAVELS
import { JourneyTravel } from '../models/travel.model.js';  
import { JourneyUser } from '../models/userModel.js';  
import { JourneyFlight } from '../models/flight.model.js';
import { JourneyAccomodation } from '../models/accommodation.model.js';


//Create Crud for travel from travel model 

    //create a travel
    

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

    export { addTravel, getTravels, getTravelById, updateTravel, deleteTravel };
    





