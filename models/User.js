const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  pageName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", dataSchema);

module.exports = User;
