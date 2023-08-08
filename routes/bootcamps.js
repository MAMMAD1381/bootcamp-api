const express = require('express')
const {updateBootcamp, getBootcamp, deleteBootcamp, getBootCamps, newBootcamp, getBootCampsInRadius, uploadPhoto} = require("../controller/bootcamps");
const {authorization, roleAuthorization, ownershipAuthorization, oneResourcePerUser} = require('../middleware/authorization')
const Bootcamp = require('../models/Bootcamp')
const advancedQueries = require('../middleware/advancedQueries')
const router = express.Router();
const courses = require('./courses')


router.route('/').get(advancedQueries(Bootcamp, {path: 'courses', select: 'title description'}), getBootCamps)
                 .post(authorization, roleAuthorization(['admin', 'publisher']), oneResourcePerUser(Bootcamp), newBootcamp)

router.route('/:id').get(getBootcamp)
                    .put(authorization, roleAuthorization(['admin', 'publisher']), ownershipAuthorization(Bootcamp), updateBootcamp)
                    .delete(authorization, roleAuthorization(['admin', 'publisher']), ownershipAuthorization(Bootcamp), deleteBootcamp)

router.route('/radius/:zipcode/:range/:unit').get(getBootCampsInRadius)

router.route('/:id/photo').put(authorization, roleAuthorization(['admin', 'publisher']), ownershipAuthorization(Bootcamp), uploadPhoto)
router.use('/:bootcampId/courses', courses)
module.exports = router
