const mongoose = require("mongoose");

var userschema = new mongoose.Schema({
    username : {
        type : String,
        requireed : [true, "Please add the Name"]
    },
    email : {
        type : String,
        requireed : [true, "Please add the Email Address"],
        unique : [true, "Email Address already taken"]
    },
    password : {
        type : String,
        requireed : [true, "Please add the password"]
    },
},{
    timestamps : true,
});

const User = mongoose.model('user', userschema);
module.exports = User;