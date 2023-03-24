const Travel = require("../Model/travel");

const getTravels = async (req, res, next) => {
  try {
    const travels = await Travel.find().populate("category");

    res.status(201).json({ message: "Амжилттай аялалууд олдлоо.", travels });
  } catch (err) {
    next(err);
  }
};

const createTravel = async (req, res, next) => {
  const {
    title,
    description,
    travelImg,
    travelPrice,
    travelDay,
    travelLocation,
    category,
  } = req.body;

  try {
    const travel = await Travel.create({
      title,
      description,
      travelImg,
      travelPrice,
      travelDay,
      travelLocation,
      category,
    });

    res.status(201).json({ message: "Амжилттай аялал үүсгэлээ.", travel });
  } catch (err) {
    next(err);
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
