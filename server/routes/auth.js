const express = require('express');
// const validator = require('validator');
const passport = require('passport');
const crypto = require('crypto');
const User = require('mongoose').model('User');
// import { renderToString } from 'react-dom/server';
const path = require('path');
const nodemailer = require('nodemailer');
const { EmailTemplate } = require('email-templates');
const async = require('async');

const router = new express.Router();

const transporter = nodemailer.createTransport({
  service: 'qq',
  port: 465,
  secure: true,
  // secureConnection: false,
  auth: {
    user: process.env.mail,
    pass: process.env.pass,
  },
});

router.post('/signup', (req, res, next) =>
  // const validationResult = validateSignupForm(req.body);
  // if (!validationResult.success) {
  //   return res.status(400).json({
  //     success: false,
  //     message: validationResult.message,
  //     errors: validationResult.errors
  //   });
  // }
  passport.authenticate('local-signup', err => {
    if (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        // the 11000 Mongo code is for a duplication email error
        // the 409 HTTP status code is for conflict error
        return res.status(409).json({
          isSuccess: false,
          message: '換個郵箱吧～這個被人用過了.',
        });
      }

      return res.status(400).json({
        isSuccess: false,
        message: '註冊失敗',
      });
    }

    return res.status(200).json({
      email: req.body.email,
      isSuccess: true,
      message: '註冊成功.',
    });
  })(req, res, next),
);

router.post('/login', (req, res, next) =>
  passport.authenticate('local-login', (err, tokens, data) => {
    if (err) {
      if (err.name === 'IncorrectCredentialsError') {
        return res.status(401).json({
          isSuccess: false,
          message: '賬號密碼錯誤',
        });
      }

      return res.json({
        isSuccess: false,
        message: '無法完成登錄',
      });
    }
    return res.status(200).json({
      isSuccess: true,
      message: '你已成功登錄！',
      refreshToken: tokens.refreshToken,
      accessToken: tokens.accessToken,
      user: data,
    });
  })(req, res, next),
);

router.post('/forgot', (req, res) => {
  // User.findOne({
  //     email: req.body.email
  // }).exec(function(err, user) {
  //     if (user) {
  //         // create the random token
  //         crypto.randomBytes(20, function(err, buffer) {
  //             const token = buffer.toString('hex');
  //             User.findByIdAndUpdate({ _id: user._id }, { reset_password_token: token, reset_password_expires: Date.now() + 86400000 }, { upsert: true, new: true }).exec(function(err, new_user) {
  //                 const locals = {
  //                     email: req.body.email,
  //                     name: user.name,
  //                     token: token,
  //                 };
  //                 //create the path of email template folder
  //                 const templateDir = path.join(__dirname, "../", 'mailTemplate', 'resetPassword');
  //
  //                 const testMailTemplate = new EmailTemplate(templateDir);
  //
  //                 // let locals = {
  //                 //     userName: "XYZ" //dynamic data for bind into the template
  //                 // };
  //
  //                 testMailTemplate.render(locals, function (err, temp) {
  //                     if (err) {
  //                         console.log("error", err);
  //
  //                     } else {
  //                         // console.log(temp)
  //                         transporter.sendMail({
  //                             from: process.env.mail,
  //                             to: locals.email,
  //                             subject: '【接机系统】 密码重置',
  //                             // text: temp.text,
  //                             html:  temp.html,
  //                             attachments: [{
  //                                 filename: 'cssaQR.png',
  //                                 path: path.join(__dirname, "../", 'static', 'cssaQR.png'),
  //                                 cid: '../../static/cssaQR.png' //same cid value as in the html img src
  //                             }],
  //                         }, function (error, info) {
  //                             if (error) {
  //                                 console.log(error);
  //                                 return done(error);
  //                             }
  //                             console.log('Message sent: ');
  //                             return res.status(200).json({
  //                                 success: true,
  //                                 message: "已发送密码重置邮件到" + req.body.email +", 请注意查收."
  //                             })
  //                         })
  //                     }
  //                 });
  //             });
  //         });
  //     } else {
  //         return res.status(200).json({
  //             success: false,
  //             message: "未找到此用户"
  //         })
  //     }
  // });

  async.waterfall([
    function(done) {
      User.findOne({
        email: req.body.email,
      }).exec(function(err, user) {
        if (user) {
          done(err, user);
        } else {
          return res.status(200).json({
            success: false,
            message: '未找到此用户',
          });
        }
      });
    },
    function(user, done) {
      // create the random token
      crypto.randomBytes(20, function(err, buffer) {
        const token = buffer.toString('hex');
        done(err, user, token);
      });
    },
    function(user, token, done) {
      User.findByIdAndUpdate(
        { _id: user._id },
        {
          reset_password_token: token,
          reset_password_expires: Date.now() + 86400000,
        },
        { upsert: true, new: true },
      ).exec(function(err, new_user) {
        done(err, token, new_user);
      });
    },
    function(token, user, done) {
      const locals = {
        email: req.body.email,
        name: user.name,
        token,
      };
      // create the path of email template folder
      const templateDir = path.join(
        __dirname,
        '../',
        'mailTemplate',
        'resetPassword',
      );

      const testMailTemplate = new EmailTemplate(templateDir);

      // let locals = {
      //     userName: "XYZ" //dynamic data for bind into the template
      // };

      testMailTemplate.render(locals, function(err, temp) {
        if (err) {
          console.log('error', err);
        } else {
          // console.log(temp)
          transporter.sendMail(
            {
              from: process.env.mail,
              to: locals.email,
              subject: '【接机系统】 密码重置',
              // text: temp.text,
              html: temp.html,
              attachments: [
                {
                  filename: 'cssaQR.png',
                  path: path.join(__dirname, '../', 'static', 'cssaQR.png'),
                  cid: '../../static/cssaQR.png', // same cid value as in the html img src
                },
              ],
            },
            function(error, info) {
              if (error) {
                console.log(error);
                return done(error);
              }
              console.log('Message sent: ');
              return res.status(200).json({
                success: true,
                message: `已发送密码重置邮件到${req.body.email}, 请注意查收.`,
              });
            },
          );
        }
      });
    },
  ]);
});

router.post('/reset/:token', function(req, res) {
  User.findOne(
    {
      reset_password_token: req.params.token,
      reset_password_expires: { $gt: Date.now() },
    },
    function(err, user) {
      if (!user) {
        return res.status(200).json({
          success: false,
          message: '密码重置链接无效或已过期',
        });
      }
      return res.status(200).json({
        success: true,
      });
    },
  );
});

router.post('/resetPass/:token', function(req, res) {
  async.waterfall(
    [
      function(done) {
        User.findOne(
          {
            reset_password_token: req.params.token,
            reset_password_expires: { $gt: Date.now() },
          },
          function(err, user) {
            if (!user) {
              return res
                .status(200)
                .json({ success: false, message: '密码重置链接无效或已过期' });
            }
            user.password = req.body.password.trim();
            user.reset_password_token = null;
            user.reset_password_expires = null;

            user.save(function(err) {
              if (err) {
                return done(err);
              }
              return res.status(200).json({
                success: true,
                message:
                  user.name === ''
                    ? user.email
                    : `${user.name}的密码重置已完成, 请重新登录！`,
              });
            });
          },
        );
      },
    ],
    function(err) {
      console.log(err);
    },
  );
});

module.exports = router;
