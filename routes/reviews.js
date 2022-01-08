var express = require("express");
var router = express.Router();
const Review = require("../models/reviews");
var passport = require("passport");

router.post(
  "/add-review",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    let { name } = req.user._doc;
    const { review, rating, serviceID } = req.body;
    let newReview = new Review({
      review,
      rating,
      serviceID,
      user: name,
    });
    newReview.save(function (err, review) {
      if (err) {
        res.json({
          error: "sorry there was an error while processing your request",
        });
      } else {
        res.send(review);
      }
    });
  }
);

router.post(
  "/get-reviews-by-service",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    const { serviceID } = req.body;
    Review.find({ serviceID: serviceID }, function (err, reviews) {
      if (err) {
        res.json({
          error: "sorry there was an error while processing your request",
        });
      } else {
        res.send(reviews);
      }
    });
  }
);

module.exports = router;
