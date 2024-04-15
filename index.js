require("dotenv").config();
require("express-async-errors");
const mongoose = require("mongoose");
const config = require("config");

const express = require("express");
const home = require("./routes/home");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");
const error = require("./middleware/error");
const app = express();

// const winston = require("winston");
// require("winston-mongodb");

// const transports = [
//   new winston.transports.Console(), // Log to console
//   new winston.transports.File({ filename: "logfile.log" }), // Log to file
//   new winston.transports.MongoDB({ db: "mongodb://localhost/yourDB" }), // Log to MongoDB
// ];

// // Create logger
// const logger = winston.createLogger({
//   level: "info",
//   format: winston.format.json(),
//   transports: transports,
// });



// module.exports = logger;

if (!config.get("jwtPrivateKey")) {
  logger.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

mongoose


  .connect("mongodb+srv://moulipri:ryuk130298@vidlycluster.qjnengk.mongodb.net/vidly")
  .then(() => console.log("connected to mongodb"))
  .catch((error) => console.log("could not connect to mongodb", error));

app.use(express.json());

app.use("/", home);
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);

app.use(error);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port} ...`));

//my index.js
