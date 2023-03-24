const User = require("../Model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    if (!users) {
      res.status(200).json({ message: "Хэрэглэгчдийн мэдээлэл хоосон байна." });
    }

    res.status(201).json({ message: "Хэрэглэгчдийн мэдээлэл олдлоо.", users });
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  const { name, email, password, profileImg } = req.body;

  try {
    //   if (!name || !email || !password) {
    //     res
    //       .status(400)
    //       .json({ message: "Нэр, имэйл эсвэл нууц үг байхгүй байна." });
    //   }

    const user = await User.create({
      name,
      email,
      password,
      profileImg,
    });

    res.status(201).json({ message: "Амжилттай бүртгэгдлээ", user });
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ message: `${id} -хоосон байна.` });
  }

  try {
    const user = await User.findById(`${id}`);
    if (!user) {
      res.status(400).json({ message: `${id} -тэй хэрэглэгч олдохгүй байна.` });
    }

    res.status(200).json({ message: `${id} тэй хэрэглэгч олдлоо`, user });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ message: `${id} -хоосон байна.` });
  }

  try {
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!user) {
      res.status(400).json({ message: `${id} -тэй хэрэглэгч олдсонгүй.` });
    }
    res.status(200).json({ message: `${id} тэй хэрэглэгч шинэчлэгдлээ`, user });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ message: `${id} -тэй хэрэглэгч олдсонгүй.` });
  }

  try {
    const user = await User.findByIdAndDelete(id);
    res.status(200).json({ message: `${id} тэй хэрэглэгч устгагдлаа`, user });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      res.status(200).json({ message: `email or password incorrect` });
    }

    const checkPass = bcrypt.compareSync(password, user.password);
    console.log(checkPass);
    if (!checkPass) {
      res.status(200).json({ message: `email or password incorrect` });
    }

    const { _id, role } = user;

    const token = jwt.sign({ _id, email, role }, process.env.JWT_SECRET_KEY, {
      expiresIn: 36000,
    });

    res.status(200).json({ message: `Амжилттай нэвтэрлээ`, user, token });
  } catch (error) {
    next();
  }
};

const register = async (req, res, next) => {
  const { name, email, password, phoneNumber } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  console.log(hashedPassword);

  try {
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
    });

    res.status(200).json({ message: `Succesfully`, user });
  } catch (error) {
    next();
  }
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  login,
  register,
};
