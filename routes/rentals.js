const { Rental, validate } = require("../models/rental");
const { Movie } = require("../models/movie");
const { Customer } = require("../models/customer");
const express = require("express");
const asyncMiddleware = require("../middleware/asyncMiddleware");
const router = express.Router();

router.get("/", async (req, res) => {
  const rentals = await Rental.find().sort("-dateOut");
  res.send(rentals);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid customer");

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send("Invalid movie");
  if (movie.numberInStock === 0)
    return res.status(400).send("Movie not available");

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });

  rental = await rental.save();

  movie.numberInStock--;
  await movie.save(); // Make sure to await the save operation

  // Send a success response indicating that the rental was successfully created
  res.status(201).send(rental);
});
module.exports = router;

// const { Rental, validate } = require("../models/rental");
// const { Movie } = require("../models/movie");
// const { Customer } = require("../models/customer");
// const express = require("express");
// const router = express.Router();

// router.get("/", async (req, res) => {
//   const rentals = await Rental.find().sort("-dateOut");
//   res.send(rentals);
// });

// router.post("/", async (req, res) => {
//   const { error } = validate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   const customer = await Customer.findById(req.body.customerId);
//   if (!customer) return res.status(400).send("Invalid customer");

//   const movie = await Movie.findById(req.body.movieId);
//   if (!movie) return res.status(400).send("Invalid movie");
//   if (movie.numberInStock === 0)
//     return res.status(400).send("Movie not available");

//   const session = await Rental.startSession();
//   session.startTransaction();

//   try {
//     let rental = new Rental({
//       customer: {
//         _id: customer._id,
//         name: customer.name,
//         phone: customer.phone,
//       },
//       movie: {
//         _id: movie._id,
//         title: movie.title,
//         dailyRentalRate: movie.dailyRentalRate,
//       },
//     });

//     rental = await rental.save({ session });

//     movie.numberInStock--;
//     await movie.save({ session });

//     await session.commitTransaction();
//     session.endSession();

//     console.log("Rental successfully created:", rental);

//     res.status(201).send(rental);
//   } catch (ex) {
//     await session.abortTransaction();
//     session.endSession();

//     console.error("Failed to create rental:", ex);

//     res.status(500).send("Failed to create rental.");
//   }
// });

// module.exports = router;
