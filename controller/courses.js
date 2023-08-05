const Course = require('../models/Course')
const Bootcamp = require('../models/Bootcamp')
const errorMessage = require('../utils/ErrorMessage')
const asyncHandler = require('../middleware/async')
const mongoose = require("mongoose");

/* 
   ? get all courses
   ? get all courses in specified bootcamp
*/
exports.getCourses = asyncHandler(async function (req, res, next) {
    let courses;
    if(req.params.bootcampId){
        courses = await Course.find({bootcamp: req.params.bootcampId})
        res.status(200).send({success: true,count, data: courses})
    }
    else{
        res.status(200).send(res.advancedQueriesResult)
    }
})


// ? get a single course with courseId
exports.getCourse = asyncHandler(async function (req, res, next) {
    let course = await Course.findById(req.params.courseId)
    res.status(200).send({success: true, data: course})
})

// ? post a course with bootcampId
exports.createCourse = asyncHandler(async function (req, res, next) {
    let course
    let bootcampId = req.params.bootcampId
    let bootcamp = await Bootcamp.findById(bootcampId)
    if(bootcamp){
        req.body.bootcamp = bootcampId
        course = await Course.create(req.body)
    }
    else{
        return next(new errorMessage(`bootcamp with this id doesn't exists`, 400))
    }
    res.status(201).send({success: true, data: course})
})

// ? update a course with courseId
exports.updateCourse = asyncHandler(async function (req, res, next) {
    let course = await Course.findOneAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    res.status(200).json({success: true, data: course})
})


// ? delete a course with courseId
exports.deleteCourse = asyncHandler(async function (req, res, next) {
    let course = await Course.findByIdAndDelete(req.params.courseId)
    if(course === null)
        return next(new errorMessage(`couldn't delete course with id ${req.params.courseId}`, 404))
    res.status(200).json({success: true, data: course})
})