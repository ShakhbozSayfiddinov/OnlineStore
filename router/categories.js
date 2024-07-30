const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');
const router = express.Router();
const categorySchema = mongoose.Schema({

    
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 300
    }
});



const Category = mongoose.model("Category", categorySchema)

router.get('/' , async(req, res) => {
    console.log(req.body);
    
   const categories = await Category.find().sort('name');
  res.send(categories) 
})


router.post('/' ,async (req,res) => {

    const error = validateCategory(req.body);
    if(error)
        return res.status(400).send(error.details[0].message);
    let category = new Category({
        name: req.body.name
    });
    category = await category.save();  

    res.status(201).send(category.id);
});



router.get('/:id' , async (req, res) => {
    console.log(req.params);
    let category = await Category.findById(req.params.id)
    if(!category)
        return res.status(404).send('berilgan id raqamli kurs topilmadi. ')
    res.send(category);
});




router.put('/:id' , async (req,res) => {
    const errror  = validateCategory(req.body);
    if(!category) {
        return res.status(404).send('berilgan IDdagi kurs topilmadi. ')
    }

    const error = validateCategory(req.body);
    if (error)
        return res.status(400).send(error);

    let category = await Category.findByIdAndUpdate((req.params.id, {name: req.body.name}, {
                new: true
            }));
    if(!category) 
        return res.status(404).send('berilgan Idga teng bo`lgan toifa topilmadi.')
    res.send(category)        
        
    category.name = req.body.name;
    res.send(category);
})

router.delete('/:id' , async (req,res) => {
   let category = await Category.findByIdAndDelete(req.params.id)
    if(!category) {
        return res.status(404).send('berilgan IDdagi kurs topilmadi. ')
    }

    res.send(category);
})


function validateCategory(category) {
   if(category.name.length < 3){
    const error='length < 3'
    return error
   }
 }

module.exports = router;