const Bootcamp = require('../models/Bootcamp')
const errorMessage = require('../utils/ErrorMessage')
const asyncHandler = require('../middleware/async')
const geoCoder = require('../utils/geoCoder')
const mongoose = require("mongoose");

exports.getBootCamps = asyncHandler(async function (req, res, next) {

    // filtering, selecting and pagination
    let query = {...req.query}
    let reservedTokens = ['select', 'sort', 'page', 'limit']
    let selected, sortedBy, page, limit
    query.select ? selected = query.select.split(',').join(' ') : selected = undefined
    query.sort ? sortedBy = query.sort : sortedBy = 'name'
    query.page ? page = parseInt(query.page, 10) : page = 1
    query.limit ? limit = parseInt(query.limit, 10) : limit = 10
    let skipResource = (page-1) * limit


    reservedTokens.forEach( token => {
        delete query[token]
    } )

    let bootCamps = await Bootcamp.find(query).select(selected).sort(sortedBy).skip(skipResource).limit(limit).populate({path: 'courses', select: 'title description'})
    let allResources = await Bootcamp.countDocuments()
    let currentResources = bootCamps.length
    res.status(200).send({success: true,allResources, currentResources, data: bootCamps})
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