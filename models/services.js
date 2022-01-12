const mongoose = require("mongoose");
const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: String,
  contactNo: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: String,
  price: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  rating: Number,
});
module.exports = mongoose.model("Service", serviceSchema);
