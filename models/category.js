const mongoose = require("mongoose");
const Joi = require("joi");

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 300,
  },
});

const Category = mongoose.model("Category", categorySchema);

const validateCategory = (category) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(300).required()
  });

  return schema.validate(category);
}

module.exports = {
  Category,
  categorySchema, // Export the schema
  validateCategory // Export the validation function if needed
};
