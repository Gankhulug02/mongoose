const Travel = require("../Model/travel");

const getTravels = async (req, res) => {
  try {
    const travels = await Travel.find({});
    res.status(201).json({ message: "Succesful", travels });
  } catch (error) {
    res.status(400).json({
      message: "Travel iin medeeleliig avahad aldaa garlaa",
      error: error.message,
    });
  }
};

const createTravel = async (req, res) => {
  const {
    title,
    travelDetail,
    travelImg,
    travelPrice,
    travelLocation,
    travelDay,
  } = req.body;
  if (
    !title ||
    !travelDetail ||
    !travelImg ||
    !travelPrice ||
    !travelLocation ||
    !travelDay
  ) {
    res.status(400).json({ message: "Ali neg ni hooson baina" });
    return;
  }
  try {
    const travel = await Travel.create({
      title,
      travelDetail,
      travelImg,
      travelPrice,
      travelLocation,
      travelDay,
    });
    res.status(201).json({ message: "Succesful", travel });
  } catch (error) {
    res.status(400).json({ message: "ERROR", error: error.message });
  }
};

const getTravel = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ message: `${id}, tai travel oldsongui` });
    return;
  }

  try {
    const travel = await Travel.findById(id);
    res.status(201).json({ message: "Succesful", travel });
  } catch (error) {
    res.status(400).json({ message: "ERROR", error: error.message });
  }
};

const updateTravel = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ message: `${id}, tai travel oldsongui` });
    return;
  }

  try {
    const travel = await Travel.findByIdAndUpdate(id, req.body, { new: true });
    res.status(201).json({ message: "Succesfully updated", travel });
  } catch (error) {
    res.status(400).json({ message: "ERROR", error: error.message });
  }
};

const deleteTravel = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ message: `${id}, tai hereglegch oldsongui` });
    return;
  }

  try {
    const travel = await Travel.findByIdAndDelete(id);
    res.status(201).json({ message: "Succesfully deleted", travel });
  } catch (error) {
    res.status(400).json({ message: "ERROR", error: error.message });
  }
};

module.exports = {
  createTravel,
  getTravels,
  getTravel,
  updateTravel,
  deleteTravel,
};
