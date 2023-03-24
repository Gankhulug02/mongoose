const jwt = require("jsonwebtoken");
const checkRole = (req, res, next) => {
  // if (!req.headers.authorization) {
  //   res.status(400).json({ message: "token obso" });
  // }

  // const token = req.headers.authorization.split(" ")[1];
  // const user = jwt.verify(token, process.env.JWT_SECRET);

  // if (user.role === "Admin") {
  //   res.status(400).json({ message: "token obso" });
  // } else {
  //   res
  //     .status(400)
  //     .json({ message: "Ene uildeliig hiih erhgui hurehgui baina" });
  // }
  next();
};

module.exports = checkRole;
