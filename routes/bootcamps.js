const express = require('express')
const {updateBootcamp, getBootcamp, deleteBootcamp, getBootCamps, newBootcamp, getBootCampsInRadius, uploadPhoto} = require("../controller/bootcamps");
const {authorization} = require('../middleware/authorization')
const Bootcamp = require('../models/Bootcamp')
const advancedQueries = require('../middleware/advancedQueries')
const router = express.Router();
const courses = require('./courses')


router.route('/').get(advancedQueries(Bootcamp, {path: 'courses', select: 'title description'}), getBootCamps)
                 .post(authorization, newBootcamp)

router.route('/:id').get(getBootcamp)
                    .put(authorization, updateBootcamp)
                    .delete(authorization, deleteBootcamp)

router.route('/radius/:zipcode/:range/:unit').get(getBootCampsInRadius)

router.route('/:id/photo').put(authorization, uploadPhoto)
router.use('/:bootcampId/courses', courses)
module.exports = router
