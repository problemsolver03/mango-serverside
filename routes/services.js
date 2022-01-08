var express = require("express");
var router = express.Router();
const Service = require("../models/services");
var passport = require("passport");

router.post(
  "/createService",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    let { _id } = req.user._doc;
    const {
      title,
      description,
      category,
      price,
      contactNo,
      email,
      image,
      address,
    } = req.body;

    const newService = new Service({
      title,
      description,
      category,
      price,
      contactNo,
      email,
      image,
      address,
      user: _id,
    });
    newService.save(function (err, service) {
      if (err) {
        res.json({
          error: "sorry there was an error while processing your request",
        });
      } else {
        res.send(service);
      }
    });
  }
);

router.post(
  "/services-by-user",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    let { _id } = req.user._doc;
    Service.find({ user: _id }, function (err, services) {
      if (err) {
        res.json({
          error: "sorry there was an error while processing your request",
        });
      } else {
        res.send(services);
      }
    });
  }
);

module.exports = router;
