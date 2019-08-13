const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
// const config = require('../../config/index');
const TokenGenerator = require('../middlewares/tokenGen');

/**
 *  The Auth Checker middleware function.
 */
module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(' ')[1];
  // decode the token using a secret key-phrase
  return jwt.verify(token, process.env.jwtSecret, (err, decoded) => {
    // the 401 code is for unauthorized status
    // console.log(err);
    if (err) {
      return res.status(401).end();
    }
    const tokenGenerator = new TokenGenerator(process.env.jwtSecret);
    const newAccessToken = tokenGenerator.refresh(token, {
      verify: { expiresIn: '1d' },
    });
    const userId = decoded.id;

    // check if a user exists
    return User.findById(userId, (userErr, user) => {
      if (userErr || !user) {
        return res.status(401).end();
      }
      // pass user details onto next route
      req.user = user;
      req.newAccessToken = newAccessToken;
      return next();
    });
  });
};
