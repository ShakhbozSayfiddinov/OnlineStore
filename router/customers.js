const express = require("express");
const router = express.Router();
const {Customer , validate} = require('../models/customer');

router.get("/", async (req, res) => {
  console.log(req.body);

  const customers = await Customer.find().sort("name");
  res.send(customers);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let customer = new Customer({
    name: req.body.name,
    isVip: req.body.isVip,
    phone: req.body.phone,
  });
  customer = await customer.save();

  res.status(201).send(customer.id);
});

router.get("/:id", async (req, res) => {
  console.log(req.params);
  let customer = await Customer.findById(req.params.id);
  if (!customer)
    return res.status(404).send("berilgan id raqamli kurs topilmadi. ");
  res.send(customer);
});


module.exports = router;
