// Starting point of the application 
const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
const router = require('./routes/index.js');

// DB Setup
mongoose.connect('mongodb://localhost/test');

// App Setup
app.use(morgan('dev'));
app.use(bodyParser.json({type:'*/*'}));
router(app);

// Server Setup
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port,'0.0.0.0');
console.log('Server listening on: ', port);
module.exports = server;