const mongoose = require('mongoose')
async function connectDB(){
    const db_url = process.env.DB_URL
    const connection = await mongoose.connect(db_url)

    console.log(`connected to host: ${connection.connection.host}`)
}

module.exports = connectDB