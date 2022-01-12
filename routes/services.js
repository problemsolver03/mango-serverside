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
      rating: 5,
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
    let { user } = req.body;

    Service.find({ user }, function (err, services) {
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

router.post(
  "/edit-service",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    let {
      serviceID,
      title,
      email,
      contactNo,
      address,
      price,
      image,
      category,
      description,
    } = req.body;
    Service.findOneAndUpdate(
      { _id: serviceID },
      { title, email, contactNo, price, image, category, address, description },
      function (err, service) {
        if (err) {
          res.json({
            error: "sorry there was an error while processing your request",
          });
        } else {
          res.send(service);
        }
      }
    );
  }
);

router.post("/get-service", function (req, res) {
  let serviceID = req.body.serviceID;
  console.log(serviceID);
  Service.findOne({ _id: serviceID }, function (err, service) {
    if (err) {
      res.json({
        error: "sorry there was an error while processing your request",
      });
    } else {
      res.send(service);
    }
  });
});

module.exports = router;
