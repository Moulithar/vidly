const _ = require("lodash");

const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const express = require("express");
const Joi = require("joi");
const router = express.Router();
const config = require("config");
const jwt = require("jsonwebtoken");
// post a request

router.post("/", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(400).send("Invalid email or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) res.status(400).send("Invalid email or password");
  const token = user.generateAuthToken();

  res.send(token);
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });
  const error = schema.validate(req);
  return error;
}

module.exports = router;
