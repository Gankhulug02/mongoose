const logger = (req, res, next) => {
  console.log("Middleware");
  req.miniiNer = "Azure baina";
  next();
};

module.exports = logger;
