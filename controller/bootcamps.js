const Bootcamp = require('../models/Bootcamp')
const errorMessage = require('../utils/ErrorMessage')
const asyncHandler = require('../middleware/async')
const geoCoder = require('../utils/geoCoder')
const mongoose = require("mongoose");
const fileUpload = require('express-fileupload')
const advancedQueries = require('../middleware/advancedQueries')
require('dotenv')


// ? get all bootcamps
exports.getBootCamps = asyncHandler(async function (req, res, next) {
    res.status(200).send(res.advancedQueriesResult)
})

// ? get a single bootcamp
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

// ? update a bootcamp
exports.updateBootcamp = asyncHandler(async function (req, res, next) {
    let id = req.params.id
    let bootcamp = await Bootcamp.findByIdAndUpdate(id, req.body, {new: true, runValidators: true})
    if(bootcamp === null)
        return next(new errorMessage(`couldn't update the bootcamp with id: ${id}`), 404)

    res.status(200).send({success: true, data: bootcamp})
})

// ? delete a bootcamp with given id
exports.deleteBootcamp = asyncHandler(async function (req, res, next) {
    let id = req.params.id;
    let bootcamp = await Bootcamp.findById(id)
    if(bootcamp === null)
        return next(new errorMessage(`couldn't delete bootcamp with id ${id}`, 404))
    bootcamp.deleteOne()
    res.status(200).send({success: true, data: {}})
})

exports.newBootcamp = asyncHandler(async function (req, res, next){
    const bootcamp = await Bootcamp.create(req.body)
    res.status(201).send({success: true, data: bootcamp})
})

// ? get bootcamps in a certain radius
exports.getBootCampsInRadius = asyncHandler(async function(req, res, next){
    const {zipcode, range, unit} = req.params
    let location = await geoCoder.geocode(zipcode)
    const {longitude, latitude} = location[0]
    let radius;
    if( unit === 'km'){
        radius = range / 6378 // km

    }
    else if(unit === 'mile'){
        radius = range / 3963 // mile
    }

    const bootCamps = await Bootcamp.find({
        location: {
            $geoWithin: { $centerSphere: [ [longitude, latitude], radius ] }
        }
    })
    res.status(200).send({success: true, count: bootCamps.length, unit ,data: bootCamps})
})

// ? upload photo
exports.uploadPhoto = asyncHandler(async function(req, res, next){
    let id = req.params.id
    let photoFile = {...req.files.file}
    let ext = photoFile.name.split('.')
    photoFile.ext = ext[ext.length-1]
    photoFile.name = `${id}.${photoFile.ext}`

    // ? vallidation for size and type
    if (!photoFile.mimetype.startsWith('image')){
        next(new errorMessage('the sent file was not an image', 400))
    }
    if(photoFile.size > process.env.PHOTO_SIZE){
        next(new errorMessage(`size of the sent file should be maximum of ${parseInt(process.env.PHOTO_SIZE)/1000} KB`, 400))
    }
    photoFile.mv(`${process.env.PHOTO_PATH}/${photoFile.name}`, async function(err){
        if(err){
            return next(new errorMessage('there was an issue with saving file', 500))
        }
        let bootcamp = await Bootcamp.findByIdAndUpdate(id, {photo: photoFile.name})
    })
    res.send({success: 'true'})
})