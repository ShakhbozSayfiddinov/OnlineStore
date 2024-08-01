const express = require('express');
const {Course, validate} = require('../models/course');
const { Category } = require('../models/category');
const router = express.Router();

router.get('/', async (req, res) => {
    console.log(req.body);
    const courses = await Course.find().sort('title');
    res.send(courses)
});

router.post('/' , async(req, res) => {
    const error = validate(req.body);

    if(error)
        return res.status(400).send(error.details[0].message);

   const category = await Category.findById(req.body.categoryid);
   if(!category)
    return res.status(400).send('berilgan Id ga reng bo lgan toifa topilmadi')

    let course = new Course({
        title: req.body.title,
        category: {
            _id: category._id,
            name: category.name
        },
        trainer: req.body.trainer,
        tags: req.body.tags,
        status: req.body.status
    });
    course = await course.save();

    res.status(201).send(course.id)
    
});
router.get('/:id' , async (req, res) => {
    console.log(req.params);
    let course = await course.findById(req.params.id)
    if(!course)
        return res.status(404).send('berilgan id raqamli kurs topilmadi. ')
    res.send(course);
});
router.put('/:id' , async (req,res) => {
    const errror  = validate(req.body);

    const category = await Category.findById(req.body.categoryid)
    if(!category) {
        return res.status(404).send('berilgan IDdagi toife topilmadi. ')
    }

    const course = await Course.findById(req.body.categoryid , {
        title: req.body.title,
        category: {
            _id: category._id,
            name: category.name
        },
        trainer: req.body.trainer,
        tags: req.body.tags,
        status: req.body.status
    }, {new: true});
    if(!course) {
        return res.status(404).send('berilgan IDdagi kurs topilmadi. ')
    }
      
    res.send(course);
})

router.delete('/:id' , async (req,res) => {
   let course = await course.findByIdAndDelete(req.params.id)
    if(!course) {
        return res.status(404).send('berilgan IDdagi kurs topilmadi. ')
    }

    res.send(course);
});

module.exports = router;