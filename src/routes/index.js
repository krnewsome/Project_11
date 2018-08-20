'use strict'


/* ---------- REQUIRE ---------- */

const express = require('express');
const app = express();
const router = express.Router();
const mid = require('../middleware');
const User = require('../models/user').User;
const Course = require('../models/courses_reviews').Course;
const Review = require('../models/courses_reviews').Review;


/* ---------- ROUTES ---------- */

// USER ROUTES

// GET authenticated users
router.get('/users', mid.userAuthenicate, function (req, res, next) {
  res.send(req.user);
});// end of GET authenticated user

// POST users
// create a user
router.post('/users', function (req, res, next) {
  const user = new User(req.body);
  user.save(function (err, user) {
    if (err) return next(err);
    res.location('/');
    res.sendStatus(201);
  });
});// end of POST user

// COURSE ROUTES

// GET all courses
router.get('/courses', function (req, res, next) {
  Course.find({}, 'title', function (err, courses) {
    res.json(courses);
  });
});// end of Get all courses

// GET specific course
router.get('/courses/:cID', function (req, res, next) {
  Course.findById(req.params.cID, function (err, course) {
    if (course === undefined) {
      res.send('Course not found');
    }
  })
  .populate('reviews')
  .exec(function (err, courses) {
    res.json(courses);
  });
});// end of GET specific course

// POST create new course
router.post('/courses', mid.userAuthenicate, function (req, res, next) {
  const course = new Course(req.body);
  course.save(function (err, course) {
    if (err) return next(err);
    res.location('/');
    res.sendStatus(201);
  });// end of save
});// end of POST course

// PUT update course
router.put('/courses/:cID', mid.userAuthenicate, function (req, res, next) {
  Course.findById(req.params.cID)
  .exec(function (err, course) {
    course.update(req.body, function (err, result) {
      if (err) return next(err);
      res.json(result);
    });// end of update
  });// end of exec
});// end of PUT update course

// POST create new review
router.post('/courses/:cID/reviews', mid.userAuthenicate, function (req, res, next) {
  const review = new Review(req.body);
  review.save(function (err, review) {
    if (err) return next(err);
    res.location('/courses/' + req.params.cID);
    res.sendStatus(201);
  });// end of save
});// end of POST review

module.exports = router;
