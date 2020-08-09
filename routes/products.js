var express = require('express');
var router = express.Router();
var Product = require("../models/product");
var checkAuth = require("../middlewares/checkAuth");

/* GET home page. */
router.get("/", async function(req, res, next) {
  let products = await Product.find();
  console.log(req.session.user);
  res.render("products/list", {title : "Current Products in Inventory", products});
});

router.get("/add", checkAuth, async function(req, res, next) {
  res.render("products/add");
});
   
router.post("/add", async function(req, res, next) {
  let product = new Product(req.body);
  await product.save();
  res.redirect("/products");
});

router.get("/delete/:id", async function(req, res, next) {
  let product = await Product.findByIdAndDelete(req.params.id);
  res.redirect("/products");

});

router.get("/cart/:id", async function(req, res, next) {
  let product = await Product.findById(req.params.id);
  console.log("aasd");
  let cart = [];
  if(req.cookies.cart) cart = req.cookies.cart;
  cart.push(product);
  res.cookie("cart", cart);
  res.redirect("/products");

});

router.get("/cart/remove/:id", async function(req, res, next) {  
  let cart = [];
  if(req.cookies.cart) cart = req.cookies.cart;
  cart.splice(cart.findIndex(c => c._id == req.params.id), 1);
  res.cookie("cart", cart);
  res.redirect("/cart");

});

router.get("/update/:id", async function(req, res, next) {
  let product = await Product.findById(req.params.id);
  res.render("products/update", {product});
});

router.post("/update/:id", async function (req, res, next) {
  let product = await Product.findById(req.params.id);
  product.name = req.body.name;
  product.price = req.body.price;
  product.quantity = req.body.quantity;
  await product.save();
  res.redirect("/products");
});

module.exports = router;
