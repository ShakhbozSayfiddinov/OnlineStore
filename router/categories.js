const express = require("express");
const router = express.Router();
const { Category, validate } = require("../models/category");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
 
  const categories = await Category.find().sort("name");
  if(!categories){
    throw new Error('toifalarni olishda kutilmagan xato yuz berdi. ')
  }
  res.send(categories);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let category = new Category({
    name: req.body.name,
  });
  category = await category.save();

  res.status(201).send(category);
});

router.get("/:id", async (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    return res.status(404).send('yaroqsiz ID');
  }
  let category = await Category.findById(req.params.id);
  if (!category)
    return res.status(404).send("Berilgan IDga teng bo'lgan toifa topilmadi");

  res.send(category);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let category = await Category.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true,
    }
  );

  if (!category)
    return res.status(404).send("Berilgan IDga teng bo'lgan toifa topilmadi");

  res.send(category);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  let category = await Category.findByIdAndDelete(req.params.id);
  if (!category)
    return res.status(404).send("Berilgan IDga teng bo'lgan toifa topilmadi");

  res.send(category);
});

module.exports = router;
