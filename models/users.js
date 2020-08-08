var mongoose = require("mongoose");

var UserSchema = mongoose.Schema({
    name : String,
    email : String,
    dob : String,
    password : String,
});

const User = mongoose.model("User", UserSchema);
module.exports = User;