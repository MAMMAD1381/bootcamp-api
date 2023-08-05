const express = require('express')
const {updateBootcamp, getBootcamp, deleteBootcamp, getBootCamps, newBootcamp, getBootCampsInRadius, uploadPhoto} = require("../controller/bootcamps");
const Bootcamp = require('../models/Bootcamp')
const advancedQueries = require('../middleware/advancedQueries')
const router = express.Router();
const courses = require('./courses')


router.route('/').get(advancedQueries(Bootcamp, {path: 'courses', select: 'title description'}), getBootCamps).post(newBootcamp)
router.route('/:id').get(getBootcamp).put(updateBootcamp).delete(deleteBootcamp)
router.route('/radius/:zipcode/:range/:unit').get(getBootCampsInRadius)
router.route('/:id/photo').put(uploadPhoto)
router.use('/:bootcampId/courses', courses)
module.exports = router
