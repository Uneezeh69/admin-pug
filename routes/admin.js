var express = require('express');
var router = express.Router();
var Admin = require("../models/admin");

/* GET users listing. */
router.get('/signup', function(req, res, next) {
  res.render("admin/signup");
});

router.get('/login', function(req, res, next) {
  res.render("admin/login");
});

router.get('/logout', function(req, res, next) {
  req.session.admin = null;
  res.redirect("/login");
});

router.post('/login', async function(req, res, next) {
  let admin = await Admin.findOne({
    email:req.body.email,
    password:req.body.password
  });
  if(!admin) return res.redirect("/login");
  req.session.admin = admin;
  return res.redirect("/");
});

router.post('/signup', async function(req, res, next) {
  let admin = new Admin(req.body);
  await admin.save();
  res.redirect("/");
});

module.exports = router;
