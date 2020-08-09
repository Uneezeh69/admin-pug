var mongoose = require("mongoose");

var productSchema = mongoose.Schema({
    name : String,
    price : String,
    quantity : String,
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;