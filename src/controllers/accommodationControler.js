//ICI c'est le CRUD du AccomodationController

import { JourneyAccomodation } from '../models/accommodation.model.js';
import Amadeus from "amadeus";

//const Amad = require('amadeus');

const AMADEUS_CLIENT_ID = "***REMOVED***";
const AMADEUS_CLIENT_SECRET = "***REMOVED***";

const amadeus = new Amadeus({
  clientId: AMADEUS_CLIENT_ID,
  clientSecret: AMADEUS_CLIENT_SECRET,
});

//create CRUD for accomodations from accommodation.model.js 

    //Création d'un hébergement
    const addAccommodation = async (req, res) => {
        const { name, address, city, country, zipCode, description, stars } = req.body;
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
        console.log('########################### Accommodation saved ###########################');
        res.send('Accommodation saved');
    }

    //Récupération de tous les hébergements
    const getAccommodations = async (req, res) => {
        try{
            const { city, name, adults, checkInDate, checkOutDate } = req.query;
            if (!city || !name || !adults || !checkInDate || !checkOutDate) {
                throw new Error('Missing parameters');
            }

            const { hotelList } = await amadeus.referenceData.locations.hotels.byCity.get({
                cityCode: city,
                radius: '5',
                radiusUnit: 'KM',
                hotelSource: 'ALL'

            });


            const { data } = await amadeus.shopping.hotelOffersSearch.get({
                hotelIds: name,
                adults: adults,
                checkInDate: checkInDate,
                checkOutDate: checkOutDate,
                roomQuantity: 1
            });

            console.log('########################### Accommodations found ###########################');

            res.send(hotelList);
            //res.send(data);
        } catch (error) {
        console.log(
            "######################################",
            error,
            "######################################"
        );
        res.status(400).json("wallah y a rien frr");
        }

    };

    //Récupération d'un hébergement par son id
    const getAccommodationById = async (req, res) => {
        const { id } = req.params;
        const accomodation = await JourneyAccomodation.findById(id);
        console.log('########################### Accommodation found ###########################');
        res.send(accomodation);
    }

    //Modification d'un hébergement
    const updateAccommodation = async (req, res) => {
        const { id } = req.params;
        const { name, address, city, country, zipCode, description, stars } = req.body;
        const accomodation = await JourneyAccomodation.findByIdAndUpdate(id, {
            name,
            address,
            city,
            country,
            zipCode,
            description,
            stars,
        });
        console.log('########################### Accommodation updated ###########################');
        res.send(accomodation);
    }

    //Suppression d'un hébergement
    const deleteAccommodation = async (req, res) => {
        const { id } = req.params;
        await JourneyAccomodation.findByIdAndDelete(id);
        console.log('########################### Accommodation deleted ###########################');
        res.send('Accommodation deleted');
    }

    export { addAccommodation, getAccommodations, getAccommodationById, updateAccommodation, deleteAccommodation };

    
