const mongoose = require("mongoose");
const Joi = require("joi");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50,
  },
});

const Genre = mongoose.model("genre", genreSchema);

function validateSchema(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  const error = schema.validate(genre);
  return error;
}

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validate = validateSchema;
