const mongoose = require('mongoose')
require('colors')
async function connectDB(){
    let db_url = process.env.DB_URL
    let db_name = process.env.DB_NAME
    const connection = await mongoose.connect(`${db_url}/${db_name}`)
    console.log(`connected to host: ${connection.connection.host}`.blue)
}

module.exports = connectDB
