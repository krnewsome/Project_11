'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

//mongoose connection
mongoose.connect('mongodb://localhost:27017/crAPI');
const db = mongoose.connection;

db.on('error', function (err) {
  if (err) {
    console.log(`There's an error connecting to the database: ${err}`)
  }
    console.log('Connection to database sucessful!')
})

/* ----------- ROUTES ---------- */

const router = require('./routes/routes.js');
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
