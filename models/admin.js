var mongoose = require("mongoose");

var AdminSchema = mongoose.Schema({
    name : String,
    email : String,
    dob : String,
    password : String,
});

const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;