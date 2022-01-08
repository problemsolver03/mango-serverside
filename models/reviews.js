const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  serviceID: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Review", reviewSchema);
