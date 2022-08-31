import { JourneyCoefficient as Coeff } from "../models/backoffice.model.js";

// crud for coefficient
const addCoefficient = async (req, res) => {
  const { coefficient, destination, margin } = req.body;
  const journeyCoefficient = new Coeff({
    coefficient,
    destination,
    margin,
  });
  await journeyCoefficient.save();
  console.log(
    "########################### Coefficient saved ###########################"
  );
  res.send("Coefficient saved");
};

const getCoefficients = async (req, res) => {
  const coefficients = await Coeff.find();
  console.log(
    "########################### Coefficients found ###########################"
  );
  res.json(coefficients);
};

const updateCoefficient = async (req, res) => {
  const { id } = req.params;
  const { coefficient, destination, margin } = req.body;
  const journeyCoefficient = await Coeff.findByIdAndUpdate(id, {
    coefficient,
    destination,
    margin,
  });
  console.log(
    "########################### Coefficient updated ###########################"
  );
  res.json(journeyCoefficient);
};

export { addCoefficient, getCoefficients, updateCoefficient };
