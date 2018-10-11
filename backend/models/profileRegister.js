const mongoose = require("mongoose");

var profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  fathersName: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true,
  },
  occupation: {
    type: String
  },
  maritalStatus: {
    type: String,
    required: true
  }
});

var Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;
