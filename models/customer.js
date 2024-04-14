const mongoose = require("mongoose");
const Joi = require("joi");

const CustomerSchema = new mongoose.Schema({
  isGold: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50,
  },
  phone: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 50,
  },
});

const Customer = mongoose.model("customer", CustomerSchema);

function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(10).max(50).required(),
    isGold: Joi.boolean(),
  });

  const error = schema.validate(customer);
  return error;
}


exports.Customer = Customer;
exports.validate = validateCustomer;