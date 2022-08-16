import mongoose from "mongoose";
const { Schema } = mongoose;


const travelSchema = Schema(
    {
        name: {type: String,required: false,},
        description: {type: String},
        price: {type: Number,required: false},
        startDate: {type: Date,required: false},
        endDate: {type: Date,required: false},
        paid: {type: String,required: false},
        userId: {type: String, required: false},
        // flightId: [{ type: Schema.Types.ObjectId, ref: "JourneyFlight" }],
        // accommodationId: [{ type: Schema.Types.ObjectId, ref: "JourneyAccommodation" }],
        // userId : [{ type: Schema.Types.ObjectId, ref: "JourneyUser" }] 
    },
);

export const JourneyTravel = mongoose.model("JourneyTravel", travelSchema);
//export default JourneyTravel;



