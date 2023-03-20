const mongoose = require("mongoose");

// const DATABASE_URI = process.env.DATABASE_URI;

const connectDB = async (dbUrl) => {
  try {
    console.log(dbUrl);
    await mongoose.connect(dbUrl);
    console.log("MONGODB - tei holbogdloo".green);
  } catch (error) {
    console.log("MongoDB - tei holbodokhod aldaa garlaa", error);
  }
};

module.exports = { connectDB };
