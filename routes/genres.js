
const logger = require("../index");
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
const { Genre, validate } = require("../models/genre");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  // logger.error('Error creating genre', error);
    const genres = await Genre.find().sort({ name: 1 });
  res.send(genres);
});

// post a request

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);
  let genre = new Genre({ name: req.body.name });

  genre = await genre.save();
  res.send(genre);
});

//edit a genre

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!genre)
    return res.status(404).send("There is no genre with the given id");

  // genre.name = req.body.name;
  res.send(genre);
});

//delete a genre

router.delete("/:id", [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);
  if (!genre)
    return res.status(404).send("There is no genre with the given ID");

  res.send(genre);
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre)
    return res.status(404).send("There is no genre with the given ID");
  res.send(genre);
});

module.exports = router;
