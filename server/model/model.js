const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  salutation :{
    type: String,
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  emailAddress: {
    type: String,
  },
  mobilenumber: {
    type: Number,
  },
  DOB: {
    type: String,
  },
  gender: {
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
