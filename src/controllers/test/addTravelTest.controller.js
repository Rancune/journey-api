import mongoose from "mongoose";
const { Schema } = mongoose;
import { JourneyTravel } from "../../models/travel.model.js";

export const addTravelTest = async () => {

    const journeyTravel = new JourneyTravel({
        name: "Travel to Paris",    
        description: "Travel to Paris with a nice car",
        price: 10000,
        startDate: new Date("2020-01-01"),
        endDate: new Date("2020-01-02"),
        flightId: "62e7b79dd692a9f51ab4a572",
        accommodationId: "62e7b79dd692a9f51ab4a574",
        userId: "62e7b79dd692a9f51ab4a570",
    });

    await journeyTravel.save();
    console.log('########################### Travel saved ###########################');



}
