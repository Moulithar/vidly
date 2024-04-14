const mongoose = require("mongoose");
const Joi = require("joi");
const { genreSchema } = require("./genre");

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50,
  },
  isGold: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 50,
  },
});

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 255,
  },
  genre: {
    type: genreSchema,
  },
  numberInStock: {
    type: Number,

    min: 0,
    max: 255,
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
});

const RentalSchema = new mongoose.Schema({
  customer: {
    type: CustomerSchema,
    required: true,
  },
  movie: {
    type: MovieSchema,
    required: true,
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now,
  },
  dateReturned: {
    type: Date,
  },
  rentalFee: {
    type: Number,
    min: 0,
  },
});

const Rental = mongoose.model("rental", RentalSchema);

function validateRental(rental) {
  const schema = Joi.object({
    customerId: Joi.string().required(),
    movieId: Joi.string().required(),
  });

  const error = schema.validate(rental);
  return error;
}

exports.validate = validateRental;
exports.Rental = Rental;
