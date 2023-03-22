const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const multer = require("multer");
const path = require("path");
const colors = require("colors");

const { connectDB } = require("./config/mongoDB");
const logger = require("./middlewares/logger");
const upload = require("./middlewares/upload");
const cloudinary = require("./utils/cloudinary");
const error = require("./middlewares/error");

const userRoutes = require("./Routes/user");
const categoryRoutes = require("./Routes/category");
const travelRoutes = require("./Routes/travel");

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
// const upload = multer({ storage: storage });

const PORT = process.env.PORT;
const dbUrl = process.env.DATABASE_URI;

//Instance of express
const app = express();

//Middlewares
app.use(cors());
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

app.post("/upload", upload.single("image"), async (req, res) => {
  console.log("REQ:", req.file);
  const result = await cloudinary.uploader.upload(req.file.path);
  // console.log("CLOUD", result);

  res.status(200).json({
    message: "Амжилттай хадгаллаа.",
    imgUrl: result.secure_url,
  });
});

//ERROR
app.use(error);

connectDB(dbUrl);

app.listen(PORT, () => {
  console.log("Server started on Port:".bgBlue, PORT);
});
