const express = require('express')
const {getCourses, getCourse, createCourse, updateCourse, deleteCourse} = require('../controller/courses')
const router = express.Router({mergeParams : true})
const advancedQueries = require('../middleware/advancedQueries')
const Course = require('../models/Course')
const {authorization} = require('../middleware/authorization')

router.route('/').get(advancedQueries(Course, {path: 'bootcamp', select: 'name description'}), getCourses)
                 .post(authorization, createCourse)
router.route('/:courseId').get(getCourse)
                          .put(authorization, updateCourse)
                          .delete(authorization, deleteCourse)

module.exports = router