const express = require('express')
const {getCourses, getCourse, createCourse, updateCourse, deleteCourse} = require('../controller/courses')
const router = express.Router({mergeParams : true})
const advancedQueries = require('../middleware/advancedQueries')
const Course = require('../models/Course')

router.route('/').get(advancedQueries(Course, {path: 'bootcamp', select: 'name description'}), getCourses).post(createCourse)
router.route('/:courseId').get(getCourse).put(updateCourse).delete(deleteCourse)

module.exports = router