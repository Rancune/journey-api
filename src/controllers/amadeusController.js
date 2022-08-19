import Amadeus from "amadeus";


const AMADEUS_CLIENT_ID = process.env.AMADEUS_CLIENT_ID;
const AMADEUS_CLIENT_SECRET = process.env.AMADEUS_CLIENT_SECRET;

export const amadeus = new Amadeus({
  clientId: "***REMOVED***",
  clientSecret: "***REMOVED***"
});

export default amadeus;