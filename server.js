const express = require("express");
const dotenv = require("dotenv");
const multer = require("multer");
const path = require("path");
const colors = require("colors");

const { connectDB } = require("./config/mongoDB");
const logger = require("./logger/logger");

const userRoutes = require("./Routes/user");
const categoryRoutes = require("./Routes/category");
const travelRoutes = require("./Routes/travel");

dotenv.config();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    console.log(file);
    const fileExt = path.extname(file.originalname);
    const fileName = Math.floor(Math.random() * 1_000_000).toString(16);
    console.log("asdasfas".green, fileName);
    console.log(`${fileName}${fileExt}`);
    cb(null, `${fileName}${fileExt}`);
  },
});
const upload = multer({ storage: storage });

const PORT = process.env.PORT;
const dbUrl = process.env.DATABASE_URI;

//Instance of express
const app = express();

//Middlewares
// app.use(cors());
app.use(express.json());
app.use(logger);
app.use("/uploads", express.static("uploads"));

//Routes
app.use("/users", userRoutes);
app.use("/categories", categoryRoutes);
app.use("/travels", travelRoutes);

app.get("/", (req, res) => {
  res.json({ message: "HELLO" });
});
app.post("/upload", upload.single("image"), (req, res) => {
  console.log("req", req.file);
  res.status(200).json({
    message: "Amjilttai upload hiile",
    imgUrl: `${req.protocol}://${req.hostname}:${PORT}/${req.file.path}`,
  });
});

connectDB(dbUrl);

app.listen(PORT, () => {
  console.log("Server started on Port:".bgBlue, PORT);
});
