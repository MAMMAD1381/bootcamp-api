const Bootcamp = require('../models/Bootcamp')
const errorMessage = require('../utils/ErrorMessage')
const asyncHandler = require('../middleware/async')
const geoCoder = require('../utils/geoCoder')
const mongoose = require("mongoose");

exports.getBootCamps = asyncHandler(async function (req, res, next) {
    let bootCamps = await Bootcamp.find()
    res.status(200).send({success: true,count: bootCamps.length, data: bootCamps})
})

exports.getBootcamp =  asyncHandler(async function (req, res, next) {
    let id = req.params.id
    let bootcamp = await Bootcamp.findById(id)
    if(bootcamp !== null){
        res.status(200).send({
            success: true,
            data: bootcamp
        })
    }
    else
        next(new errorMessage(`bootcamp with id: ${req.params.id} not found`, 404))
})

exports.updateBootcamp = asyncHandler(async function (req, res, next) {
    let id = req.params.id
    let bootcamp = await Bootcamp.findByIdAndUpdate(id, req.body, {new: true, runValidators: true})
    if(bootcamp === null)
        return next(new errorMessage(`couldn't update the bootcamp with id: ${id}`), 404)

    res.status(200).send({success: true, data: bootcamp})
})

exports.deleteBootcamp = asyncHandler(async function (req, res, next) {
    let id = req.params.id;
    let bootcamp = await Bootcamp.findByIdAndDelete(id)
    if(bootcamp === null)
        return next(new errorMessage(`couldn't delete bootcamp with id ${id}`, 404))
    res.status(200).send({success: true, data: {}})
})

exports.newBootcamp = asyncHandler(async function (req, res, next){
    const bootcamp = await Bootcamp.create(req.body)
    res.status(201).send({success: true, data: bootcamp})
})

exports.getBootCampsInRadius = asyncHandler(async function(req, res, next){
    const {zipcode, range} = req.params
    let location = await geoCoder.geocode(zipcode)
    let radius = range / 6378 //km
    console.log(radius)
    const {longitude, latitude} = location[0]
    const bootCamps = await Bootcamp.find({location:{$geoWithin:{$centerSphere:[[longitude, latitude],[radius]]}}})
    res.status(200).send({success: true, count: bootCamps.length, data: bootCamps})
})