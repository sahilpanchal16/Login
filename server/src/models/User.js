const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  Username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

const userModel = mongoose.model("User", userSchema);
module.exports = { userModel };
