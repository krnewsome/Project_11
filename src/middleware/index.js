const User = require('../models/user').User;
const auth = require('basic-auth');

// user authentication
function userAuthenicate(req, res, next) {
  const userAuth = auth(req);
  if (userAuth) {
    User.authenticate(userAuth.name, userAuth.pass, function (err, user) {
      if (err) return next(err);
      req.user = user;
      return next();
    });
  } else {
    let err = new Error('Invalid password or username');
    err.status = 401;
    return next(err);
  }
}// end of user authenticaiton

module.exports.userAuthenicate = userAuthenicate;
