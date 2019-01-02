const jwt = require('jwt-simple');
const User = require("../models/user");
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret)
}

exports.signin = function(req, res, next) {
  // User has already had their email and password auth'd
    // We just need to give them a token
    res.send({ token: tokenForUser(req.user) })
};

exports.signup = function(req, res, next) {
  //req.body -> anything contained in this POST request
  const email = req.body.email;
  const password = req.body.password;
  // See if a user with a given email exists

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "You must provide email an d password " });
  }
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) {
      return next(err);
    }
    if (existingUser) {
      return res.status(422).send({ error: "Email is in use" }); //422 -> unproccessable entity. user already exists
    }
  }); //first arg -> search criteria
  // If a user with email does exist, return an error
  const user = new User({
    email: email,
    password: password
  });

  user.save(function(err) {
    if (err) {
      return next(err);
    }

    // respond to the request indicating the user was created
    res.json({ token: tokenForUser(user) });
  });
  // If a user with an email does NOT exist, create and save user record

  // Respond to request indicating the user was created
};
