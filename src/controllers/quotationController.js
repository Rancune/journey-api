import { JourneyTravel } from '../models/travel.model.js';  

//create a function to send json of a travel
export const sendJson = (travel) => {
    return {
        id: travel._id,
        name: travel.name,
        description: travel.description,
        startDate: travel.startDate,
        endDate: travel.endDate,
        flightId: travel.flightId,
        accomodationId: travel.accomodationId,
        userId: travel.userId,
    };
}






export function create (  ) {
    
}



export { create, sendJson } ;