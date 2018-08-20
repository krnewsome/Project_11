'use strict';

// load modules
const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');

// morgan
app.use(morgan('dev'));

//mongodb connection
mongoose.connect('mongodb://localhost:27017/crAPI');
const db = mongoose.connection;

//mongo error
db.on('error', function(err){
  console.error("connection error:", err);
});

db.once('open', function () {
  console.log(' db connection successful');
});

// serve static files from /public
app.use(express.static('public'))

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


/* ----------- ROUTES ---------- */

const router = require('./routes/index.js');
app.use('/api', router)


// set our port
app.set('port', process.env.PORT || 3000);

// morgan gives us http request logging
app.use(morgan('dev'));

// TODO add additional routes here


// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found'
  })
})

// global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message,
    error: {}
  });
});

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
