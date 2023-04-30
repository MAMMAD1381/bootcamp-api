const env = require('dotenv')
const express = require('express')

const bootCamps = require('./routes/bootcamps')
const auth = require('./routes/auth')
const courses = require('./routes/courses')
const users = require('./routes/users')
const reviews = require('./routes/reviews')
env.config({path: './configs/config.env'})

const app = express()
app.use('/api/v1/bootcamps/', bootCamps)
app.use('/api/v1/auth', auth)
app.use('/api/v1/courses', courses)
app.use('/api/v1/users', users)
app.use('/api/v1/reviews', reviews)

const port = process.env.PORT


app.listen(port, () => {
    console.log(`server is running on port: ${port}`)
})
app.get('/', (req, res) => {
    res.send('welcome home')
})

