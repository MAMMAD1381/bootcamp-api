const express = require('express')
const {updateBootcamp, getBootcamp, deleteBootcamp, getBootCamps, newBootcamp} = require("../controller/bootcamps");
const router = express.Router();

router.route('/').get(getBootCamps).post(newBootcamp)
router.route('/:id').get(getBootcamp).put(updateBootcamp).delete(deleteBootcamp)
module.exports = router
