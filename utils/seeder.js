const env = require('dotenv')
env.config({path: './configs/config.env'})
const Bootcamp = require('../models/Bootcamp')
const Course = require('../models/Course')
const connectDB = require('../configs/db')
const fs = require("fs");



connectDB()

const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/../_data/bootcamps.json`,'utf-8'))
const courses = JSON.parse(fs.readFileSync(`${__dirname}/../_data/courses.json`,'utf-8'))


async function createBootCamps(){
    try {
        await Bootcamp.create(bootcamps)
        await Course.create(courses)
        console.log('bootcamps and courses added successfully'.blue.italic.inverse)
        process.exit(0)
    }
    catch (error){
        console.log(error)
    }
}

async function deleteBootCamps(){
    try {
        await Bootcamp.deleteMany();
        await Course.deleteMany();
        console.log('deleted bootCamps and courses from db'.red.italic.inverse)
        process.exit(0)
    }
    catch (error){
        console.log(error)
    }
}

const mode = process.argv[2]

if(mode === '-create'){
    createBootCamps()
}
else if(mode === '-delete'){
    deleteBootCamps()
}

