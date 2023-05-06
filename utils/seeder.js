const env = require('dotenv')
env.config({path: './configs/config.env'})
const Bootcamp = require('../models/Bootcamp')
const connectDB = require('../configs/db')
const fs = require("fs");



connectDB()

const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/../_data/bootcamps.json`,'utf-8'))

async function createBootCamps(){
    try {
        await Bootcamp.create(bootcamps)
        console.log('bootcamps added successfully'.blue.italic.inverse)
        process.exit(0)
    }
    catch (error){
        console.log(error)
    }
}

async function deleteBootCamps(){
    try {
        await Bootcamp.deleteMany();
        console.log('deleted bootCamps from db'.red.italic.inverse)
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

