var express = require("express");
var router = express.Router();
var passport = require("passport");
const Appointment = require("../models/appointments");
router.post(
  "/add-appointment",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    let { username } = req.user._doc;
    const { date, serviceID } = req.body;
    let newAppointment = new Appointment({
      user: username,
      date,
      serviceID,
    });
    newAppointment.save(function (err, appointment) {
      if (err) {
        res.json({
          error: "sorry there was an error while processing your request",
        });
      } else {
        res.send(appointment);
      }
    });
  }
);

router.post(
  "/get-appointments-service",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    const { serviceID } = req.body;
    Appointment.find({ serviceID }, function (err, appointments) {
      if (err) {
        res.json({
          error: "sorry there was an error while processing your request",
        });
      } else {
        res.send(appointments);
      }
    });
  }
);

module.exports = router;
