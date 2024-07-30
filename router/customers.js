const express = require("express");
const Joi = require("joi");
const mongoose = require("mongoose");
const router = express.Router();
const customerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 300,
  },
  isVip: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 300,
  },
});

const Customer = mongoose.model("Customer", customerSchema);

router.get("/", async (req, res) => {
  console.log(req.body);

  const customers = await Customer.find().sort("name");
  res.send(customers);
});

router.post("/", async (req, res) => {
  const { error } = validateCustomer(req.body);
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
function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    isVip: Joi.boolean().required(),
    phone: Joi.string().min(5).max(50).required(),
  });
  return schema.validate(customer);
}

module.exports = router;
