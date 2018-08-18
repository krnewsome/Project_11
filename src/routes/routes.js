'use strict'

const express = require('express');
const app = express();
const router = express.Router();
const User = require('../models').User;
// const models = require('../models')

/* ---------- ROUTES ---------- */

// GET user
router.get('/users', function (req, res, next){
  console.log(User)

  next()
})


module.exports = router;
