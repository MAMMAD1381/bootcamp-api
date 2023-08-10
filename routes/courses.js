const express = require('express');
const {
    getCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse,
} = require('../controller/courses');
const {
    authorization,
    roleAuthorization,
    ownershipAuthorization,
} = require('../middleware/authorization');
const Course = require('../models/Course');
const advancedQueries = require('../middleware/advancedQueries');
const router = express.Router({ mergeParams: true });

router
    .route('/')
    .get(
        advancedQueries(Course, {
            path: 'bootcamp',
            select: 'name description',
        }),
        getCourses
    )
    .post(
        authorization,
        roleAuthorization(['admin', 'publisher']),
        createCourse
    );
router
    .route('/:id')
    .get(getCourse)
    .put(
        authorization,
        roleAuthorization(['admin', 'publisher']),
        ownershipAuthorization(Course),
        updateCourse
    )
    .delete(
        authorization,
        roleAuthorization(['admin', 'publisher']),
        ownershipAuthorization(Course),
        deleteCourse
    );

module.exports = router;
