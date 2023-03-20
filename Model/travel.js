const mongoose = require("mongoose");

const TravelSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  travelDetail: {
    type: String,
    maxlength: [500, "tailbar 500 temdegtees ihgui baina"],
  },
  travelImg: {
    type: String,
  },
  travelPrice: {
    type: Number,
    required: true,
  },
  travelLocation: {
    type: String,
    required: true,
  },
  travelDay: {
    type: Number,
    required: true,
  },
});

const travel = mongoose.model("travel", TravelSchema);

module.exports = travel;
