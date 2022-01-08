const mongoose = require("mongoose");
const appointSchema = new mongoose.Schema({
  serviceID: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});
module.exports = mongoose.model("Appointment", appointSchema);
