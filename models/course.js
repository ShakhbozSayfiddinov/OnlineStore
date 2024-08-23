const mongoose = require('mongoose');
const Joi = require('joi');
const { categorySchema } = require('./category'); // Import the schema

const Course = mongoose.model('Course', new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255
  },
  // category: {
  //   type: categorySchema, // Use the imported schema
  //   required: true
 // },
  trainer: {
    type: String,
    required: true
  },
  tags: {
    type: [String]
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    required: true
  }
}));

const validate = (course) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(255).required(),
    category: Joi.object({ // Define the validation schema for category if needed
      name: Joi.string().min(3).max(300).required()
    }).required(),
    trainer: Joi.string().required(),
    status: Joi.string().valid('Active', 'Inactive').required(),
    tags: Joi.array().items(Joi.string())
  });
  
  return schema.validate(course);
};

module.exports = {
  Course,
  validate // Export the validation function if needed
};
