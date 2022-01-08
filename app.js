var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var passport = require("passport");
var mongoose = require("mongoose");

require("dotenv").config({ path: path.join(__dirname, "./.env") });

mongoose.connect(process.env.connectionString);
mongoose.connection.on("error", (error) => console.log(error));
mongoose.Promise = global.Promise;

var indexRouter = require("./routes/index");
var servicesRouter = require("./routes/services");
var reviewsRouter = require("./routes/reviews");
var appointmentsRouter = require("./routes/appointments");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/services", servicesRouter);
app.use("/reviews", reviewsRouter);
app.use("/appointments", appointmentsRouter);
app.use(passport.initialize());
require("./config/passport");
module.exports = app;
