const env = require('dotenv')
const express = require('express')
const morgan = require('morgan')
const bootCamps = require('./routes/bootcamps')
const auth = require('./routes/auth')
const courses = require('./routes/courses')
const users = require('./routes/users')
const reviews = require('./routes/reviews')
env.config({path: './configs/config.env'})
const connectDB = require('./configs/db')

const app = express()

//adding all routes
app.use('/api/v1/bootcamps/', bootCamps)
app.use('/api/v1/auth', auth)
app.use('/api/v1/courses', courses)
app.use('/api/v1/users', users)
app.use('/api/v1/reviews', reviews)
app.use(morgan('dev'))

const port = process.env.PORT
const mode = process.env.NODE_ENV;

//connection to database
connectDB()

app.listen(port, () => {
    console.log(`server is running on port: ${port} in ${mode} mode`)
})

//logging information
if(mode === 'development'){
    app.use(morgan('dev'))
    console.log('yoo')
}
//home route
app.get('/', (req, res) => {
    res.send('welcome home')
})

process.on('unhandledRejection', (error, promise) => {
    console.log('error' + error.message)
    server.close(() => process.exit(1))
})

