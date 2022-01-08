var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

router.get("/", function (req, res) {
  res.json({ success: true });
});

router.post("/signup", function (req, res, next) {
  const Cryptr = require("cryptr");
  const cryptr = new Cryptr(process.env.secretKey);

  const newUser = new User({
    username: req.body.username,
    password: cryptr.encrypt(req.body.password),
    name: req.body.name,
  });
  User.findOne({ username: req.body.username }, function (prmerr, prmdocs) {
    if (prmdocs === null) {
      newUser.save(function (err, docs) {
        if (err) {
          console.log(err);
          res.json({
            error: "There was an error while processing your reqeuest.",
          });
        } else {
          var token = jwt.sign({ ...docs._doc }, process.env.secretKey);
          res.json({ token: token });
        }
      });
    } else {
      res.json({ error: "User already exists" });
    }
  });
});

router.post("/login", function (req, res) {
  let { username, password } = req.body;
  const Cryptr = require("cryptr");
  const cryptr = new Cryptr(process.env.secretKey);

  User.findOne({ username: username }, function (err, user) {
    if (err) {
      res.json({ error: "Invalid username/password supplied" });
    } else if (cryptr.decrypt(user.password) !== password) {
      res.json({ error: "Invalid username/password supplied" });
    } else {
      var token = jwt.sign({ ...user._doc }, process.env.secretKey);
      res.json({ token: token });
    }
  });
});

module.exports = router;
