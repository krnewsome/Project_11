'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

/* ---------- SCHEMA ---------- */

// UserSchema
const UserSchema = new Schema({
  _id: {
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
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
  },
  password: {
    type: String,
    required: true,
  },
});// end of UserSchema


/* ---------- END OF SCHEMA ---------- */

// authentication
UserSchema.statics.authenticate = function (emailAddress, password, callback) {
  User.findOne({ emailAddress: emailAddress })
  .exec(function (error, user) {
    if (error) {
      return callback(error);
    } else if (!user) {
      const err = new Error('User not found');
      err.status = 404;
      return callback;
    }

    bcrypt.compare(password, user.password, function (error, result) {
      if (result === true) {
        return callback(null, user);
      } else {
        return callback;
      }
    });// end of execution
  });// end of find user
};// end of authenticaiton

// hash password before saving to database
UserSchema.pre('save', function (next) {
  let user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});//end of hash


/* ---------- MODULES ---------- */

const User = mongoose.model('User', UserSchema);

/* ---------- END OF MODULES ---------- */



/* ---------- EXPORTS ---------- */

module.exports.User = User;
