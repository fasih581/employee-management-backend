const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  Firstname: {
    type: String,
  },
  Lastname: {
    type: String,
  },
  EmailAddress: {
    type: String,
  },
  Mobilenumber: {
    type: Number,
  },
  DOB: {
    type: String,
  },
  Gender: {
    type: String,
  },
  qualifications: {
    type: String,
  },
  address: {
    type: String,
  },
  country: {
    type: String,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  pinzip: {
    type: String,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  },
});

const addEmp = mongoose.model('addemp',schema);

module.exports = addEmp;
