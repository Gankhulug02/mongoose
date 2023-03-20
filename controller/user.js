const User = require("../Model/User");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(201).json({ message: "Succesful", users });
  } catch (error) {
    res.status(400).json({
      message: "Hereglegchdiin medeeleliig avahad aldaa garlaa",
      error: error.message,
    });
  }
};

const createUser = async (req, res) => {
  const { name, email, password, profileImg } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({ message: "ner esvel nuuts ug hooson baina." });
    return;
  }
  try {
    const user = await User.create({
      name,
      email,
      password,
      profileImg,
    });
    res.status(201).json({ message: "Succesful", user });
  } catch (error) {
    res.status(400).json({ message: "ERROR", error: error.message });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ message: `${id}, tai hereglegch oldsongui` });
    return;
  }

  try {
    const user = await User.findById(id);
    res.status(201).json({ message: "Succesful", user });
  } catch (error) {
    res.status(400).json({ message: "ERROR", error: error.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ message: `${id}, tai hereglegch oldsongui` });
    return;
  }

  try {
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(201).json({ message: "Succesfully updated", user });
  } catch (error) {
    res.status(400).json({ message: "ERROR", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ message: `${id}, tai hereglegch oldsongui` });
    return;
  }

  try {
    const user = await User.findByIdAndDelete(id);
    res.status(201).json({ message: "Succesfully deleted", user });
  } catch (error) {
    res.status(400).json({ message: "ERROR", error: error.message });
  }
};

module.exports = { createUser, getUsers, getUser, updateUser, deleteUser };
