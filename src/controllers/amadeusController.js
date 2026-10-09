import Amadeus from "amadeus";

export const loadAmadeus = () => {
  amadeusInstance = new Amadeus({
    clientId: process.env.AMADEUS_CLIENT_ID,
    clientSecret: process.env.AMADEUS_CLIENT_SECRET,
  });
  console.log(
    "########################### Init Amadeus ###########################"
  );
};

export let amadeusInstance;
