const error = async (dbUrl) => {
  try {
    console.log(dbUrl);
    await mongoose.connect(dbUrl);
    console.log("MONGODB - tei holbogdloo".green);
  } catch (error) {
    console.log("MongoDB - tei holbodokhod aldaa garlaa", error);
  }
};

module.exports = { error };
