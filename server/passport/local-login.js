const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;
const TokenGenerator = require('../middlewares/tokenGen');
// const config = require('../../config/index');

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
      email: email.trim(),
      password: password.trim(),
    };
    // find a user by email address
    return User.findOne({ email: userData.email }, (err, user) => {
      if (err) {
        return done(err);
      }

      if (!user) {
        const error = new Error('Incorrect email or password');
        error.name = 'IncorrectCredentialsError';

        return done(error);
      }

      // check if a hashed user's password is equal to a value saved in the database
      return user.comparePassword(userData.password, (passwordErr, isMatch) => {
        if (passwordErr) {
          return done(passwordErr);
        }

        if (!isMatch) {
          const error = new Error('Incorrect email or password');
          error.name = 'IncorrectCredentialsError';

          return done(error);
        }
        const data = {
          email: user.email,
          name: user.name,
          isVolunteer: user.isVolunteer,
        };
        const payload = {
          id: user._id,
          ...data,
        };

        const tokenGenerator = new TokenGenerator(process.env.jwtSecret);
        const refreshToken = tokenGenerator.sign(payload, { expiresIn: '7d' });
        const accessToken = tokenGenerator.sign(payload, { expiresIn: '1d' });

        return done(null, { refreshToken, accessToken }, data);
      });
    });
  },
);
