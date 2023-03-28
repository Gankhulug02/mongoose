const jwt = require("jsonwebtoken");

const checkLogin = (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(400).json({ message: "Token явуулаагүй байна." });
  }
  const token = req.headers.authorization.split(" ")[1];
  const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
  if (user.role !== "Admin") {
    res.status(400).json({ message: "Энэ үйлдлийг хийх эрх хүрэхгүй байна." });
  }
  next();
};

const authorization = (...roles) => {
  return (req, res, next) => {
    if ((req, headers, authorization)) {
      res.status(400).json({ message: "Token yvuulagu baina" });
    }
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!user) {
      res.status(400).json({ message: "Ene token huchingui baina.." });
    }
    if (!roles.includes(user.role)) {
      res.josn(400).json({
        message: `Tanii ${user.role} erh ene uildeliig hiih erhgui baina`,
      });
    }
    next();
  };
};

module.exports = { checkLogin, authorization };
