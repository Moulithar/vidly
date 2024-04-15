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
const cors = require("cors");
const app = express();


if (!config.get("jwtPrivateKey")) {
  logger.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

const MONGO_URI = process.env.MONGO_URI
mongoose

  .connect(MONGO_URI)
  .then(() => console.log("connected to mongodb"))
  .catch((error) => console.log("could not connect to mongodb", error));

app.use(express.json());

app.use(cors());
app.use("/", home);
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);

app.use(error);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port} ${MONGO_URI} ...`));
