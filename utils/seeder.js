const env = require('dotenv')
env.config({path: './configs/config.env'})
const Bootcamp = require('../models/Bootcamp')
const Course = require('../models/Course')
const User = require('../models/User')
const Review = require('../models/Review')
const connectDB = require('../configs/db')
const fs = require("fs");



connectDB()

const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/../_data/bootcamps.json`,'utf-8'))
const courses = JSON.parse(fs.readFileSync(`${__dirname}/../_data/courses.json`,'utf-8'))
const users = JSON.parse(fs.readFileSync(`${__dirname}/../_data/users.json`,'utf-8'))
const reviews = JSON.parse(fs.readFileSync(`${__dirname}/../_data/reviews.json`,'utf-8'))

async function insertResources(){
    try {
        await Bootcamp.create(bootcamps)
        await Course.create(courses)
        await User.create(users)
        await Review.create(reviews)
        console.log('resources added to DB successfully'.blue.italic.inverse)
        process.exit(0)
    }
    catch (error){
        console.log(error)
    }
}

async function deleteResources(){
    try {
        await Bootcamp.deleteMany();
        await Course.deleteMany();
        await User.deleteMany();
        await Review.deleteMany()
        console.log('resources deleted from DB successfully'.red.italic.inverse)
        process.exit(0)
    }
    catch (error){
        console.log(error)
    }
}

const mode = process.argv[2]

if(mode === '-create'){
 insertResources()
}
else if(mode === '-delete'){
    deleteResources()
}

