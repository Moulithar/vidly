// require("dotenv").config();
const { User, validate } = require("../models/user");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");
const express = require("express");
const auth = require("../middleware/auth");
const asyncMiddleware = require("../middleware/asyncMiddleware");
const router = express.Router();

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

// post a request

router.post("/", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("user already registered");
  user = new User(_.pick(req.body, ["name", "email", "password"]));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const newUser = _.pick(user, ["_id", "name", "email"]);
  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send(newUser);
});

// Information Expert Principle

module.exports = router;
