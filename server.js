const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const morgan = require('morgan');

require('dotenv').config();
// dotenv.config({
//     path: "./config.env",
// });

// routes
const index = require('./routes/home.route');
const auth = require('./routes/auth.routes');
const category = require('./routes/category.routes');
const subject = require('./routes/subject.routes');
const users = require('./routes/user.routes');
const lesson = require('./routes/lesson.routes');
const connectDatabase = require('./config/db.config');
const errorHandler = require('./middlewares/error');

// Connect to database
connectDatabase();

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Sanitize data
app.use(mongoSanitize());

// Enable CORS
app.use(cors());

// mount routers
app.use('/', index);
app.use('/api/v1/auth', auth);
app.use('/api/v1/category', category);
app.use('/api/v1/subject', subject);
app.use('/api/v1/users', users);
app.use('/api/v1/lesson', lesson);


// handle error
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT,
    console.log(
        `Server running on ${process.env.NODE_ENV} mode on port ${PORT}`
    )
);

// Handle unhandle promise rejections
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
});
