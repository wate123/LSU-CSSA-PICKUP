const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;
const TokenGenerator = require('../middlewares/tokenGen');

/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true,
  },
  (req, email, password, done) => {
    const userData = {
      email: email.trim().toLowerCase(),
      password: password.trim(),
      isVolunteer: req.body.isVolunteer,
    };

    const newUser = new User(userData);
    newUser.save(err => {
      if (err) {
        return done(err);
      }
      return done(null);
    });
  },
);
