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
  },
  password: String,
  role: {
    type: String,
    ENUM: ["User", "Admin"],
    default: "User",
  },
  phoneNumber: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const user = mongoose.model("User", UserSchema, "users");

module.exports = user;
