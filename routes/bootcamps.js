const express = require('express')
const {updateBootcamp, getBootcamp, deleteBootcamp, getBootCamps, newBootcamp, getBootCampsInRadius} = require("../controller/bootcamps");
const router = express.Router();
const courses = require('./courses')

router.route('/').get(getBootCamps).post(newBootcamp)
router.route('/:id').get(getBootcamp).put(updateBootcamp).delete(deleteBootcamp)
router.route('/radius/:zipcode/:range/:unit').get(getBootCampsInRadius)
router.use('/:bootcampId/courses', courses)
module.exports = router
