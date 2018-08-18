'use strict';

const mongoose = require('mongoose');
const Schema = mongoose. Schema;

/* ---------- SCHEMA ---------- */

// UserSchema
const UserSchema = new Schema({
  id: {
    type: Schema.ObjectId,
    auto: true,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
});// end of UserSchema

// ReviewSchema
const ReviewSchema = new Schema({
  id: {
    type: Schema.ObjectId,
    auto: true,
    required: true,
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User',
  },
  postedOn: { type: Date, default: Date.now },
  rating: { type: Number, min: 1, max: 5 },
  review: String,
});// end of ReviewSchema

// CourseSchema
const CourseSchema = new Schema({
  id: {
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

/* ---------- END OF SCHEMA ---------- */


/* ---------- MODULES ---------- */

const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);
const Review = mongoose.model('Review', ReviewSchema);

/* ---------- END OF MODULES ---------- */



/* ---------- EXPORTS ---------- */

module.exports.User = User;
module.exports.Course = Course;
module.exports.Review = Review;
