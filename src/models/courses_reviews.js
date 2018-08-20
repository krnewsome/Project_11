'use strict';

const mongoose = require('mongoose');
const Schema = mongoose. Schema;

/* ---------- SCHEMA ---------- */

// CourseSchema
const CourseSchema = new Schema({
  _id: {
    type: Schema.ObjectId,
    auto: true,
    required: true,
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User',
  },

  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  estimatedTime: String,

  materialsNeeded: String,

  steps: [{
    stepNumber: Number,
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
],

  reviews: [
    {
      type: Schema.ObjectId,
      ref: 'Review',
    },
  ],
});// end of CourseSchema

// ReviewSchema
const ReviewSchema = new Schema({
  _id: {
    type: Schema.ObjectId,
    auto: true,
    required: true,
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User',
  },

  postedOn: { type: Date, default: Date.now },

  rating: { type: Number, required: true, min: 1, max: 5 },

  review: String,
});// end of ReviewSchema

/* ---------- END OF SCHEMA ---------- */


/* ---------- MODULES ---------- */

const Course = mongoose.model('Course', CourseSchema);
const Review = mongoose.model('Review', ReviewSchema);

/* ---------- END OF MODULES ---------- */


/* ---------- EXPORTS ---------- */

module.exports.Course = Course;
module.exports.Review = Review;
