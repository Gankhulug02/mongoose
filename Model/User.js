const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Хэрэглэгчийн нэрийг заавал бөглөнө үү!!!"],
  },
  profileImg: String,
  email: {
    type: String,
    unique: true,
    required: [true, "Хэрэглэгчийн emailийг заавал бөглөнө үү!!!"],
  },
  password: {
    type: String,
    // select: false,
    required: [true, "Хэрэглэгчийн password ийг заавал бөглөнө үү!!!"],
  },
  role: {
    type: String,
    ENUM: ["User", "Admin"],
    default: "User",
  },
  phoneNumber: {
    type: String,
    default: "60020202",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const user = mongoose.model("User", UserSchema, "users");

module.exports = user;
