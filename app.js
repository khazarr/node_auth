const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// db handle
mongoose.connect('mongodb://localhost:27017/node_auth', {
    useNewUrlParser: true
})

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());

// Routes
app.use('/users', require('./routes/users'));


// Start the server
const port = process.env.PORT || 3000;
app.listen(port)
console.log(`Server listening at ${port}`)