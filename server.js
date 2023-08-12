const env = require('dotenv');
env.config({ path: './configs/config.env' });
const express = require('express');
const morgan = require('morgan');
const path = require('path');

// ? security packages
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');

const bootCamps = require('./routes/bootcamps');
const auth = require('./routes/auth');
const courses = require('./routes/courses');
const users = require('./routes/users');
const reviews = require('./routes/reviews');
const me = require('./routes/me');
const connectDB = require('./configs/db');
const errorHandler = require('./middleware/errorHandler');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ? adding security packages
app.use(helmet()); // ? Helmet helps secure Express apps by setting HTTP response headers.
app.use(xss()); // ? middleware to sanitize user input
const limiter = rateLimiter({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 10 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter); // ? limits the request rate
app.use(hpp()); // ? middleware to protect against HTTP Parameter Pollution attacks
app.use(cors()); // ? middleware that can be used to enable "Cross-origin resource sharing" (CORS)

app.use(fileUpload());

// ? cookie parser
app.use(cookieParser());

// ? adding all routes
app.use('/api/v1/bootcamps/', bootCamps);
app.use('/api/v1/auth', auth);
app.use('/api/v1/courses', courses);
app.use('/api/v1/users', users);
app.use('/api/v1/reviews', reviews);
app.use('/api/v1/me', me);

app.use(errorHandler);

app.use(morgan('dev'));

const port = process.env.PORT;
const mode = process.env.NODE_ENV;

//connection to database
connectDB();

app.listen(port, () => {
    console.log(`server is running on port: ${port} in ${mode} mode`);
});

//logging information
if (mode === 'development') {
    app.use(morgan('dev'));
}
//home route
app.get('/', (req, res) => {
    res.send('welcome home');
});

process.on('unhandledRejection', (error, promise) => {
    console.error(error);
    console.log('error ' + error.message);
    // server.close(() => process.exit(1))
});
