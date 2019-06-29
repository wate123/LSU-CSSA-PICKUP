const express = require('express');
const User = require('mongoose').model('User');
const jwt = require('jsonwebtoken');
// const config = require('../../config/index');
const TokenGenerator = require('../middlewares/tokenGen');

const router = new express.Router();

router.post('/genAccessToken', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, process.env.jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: '请重新登录',
        isExpire: true,
      });
    }
    delete decoded.iat;
    delete decoded.exp;

    console.log(decoded);
    const tokenGenerator = new TokenGenerator(process.env.jwtSecret);
    const accessToken = tokenGenerator.sign(decoded, { expiresIn: '1d' });
    return res.status(200).json({ success: true, accessToken, user: decoded });
  });
});

router.post('/checkExpire', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, process.env.jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).end();
    }
    // console.log(decoded.isVolunteer)
    const tokenGenerator = new TokenGenerator(process.env.jwtSecret);
    const newToken = tokenGenerator.refresh(token, {
      verify: { expiresIn: '1d' },
    });
    return res.status(200).json({ accessToken: newToken, user: decoded });
  });
  // console.log(req.user);
});

module.exports = router;
