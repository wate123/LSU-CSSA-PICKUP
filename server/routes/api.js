const express = require('express');
require('dotenv').config();
const User = require('mongoose').model('User');
const mongoose = require('mongoose');

const nodemailer = require('nodemailer');
const { EmailTemplate } = require('email-templates');
// const config = require('../../config/index');
const path = require('path');
// var async = require('async');
// var crypto = require('crypto');
//

const router = new express.Router();

module.exports = router;

router.post('/allRequester', (req, res) => {
  User.find(
    {
      $and: [
        { name: { $ne: '' } },
        { accepted: false },
        { status: { $not: { $size: 0 } } },
      ],
    },
    'name email school hometown arriveDateTime ' +
      'arriveAirport luggage friends phone social toVolunteer',
  )
    .sort({ arriveDateTime: 1 })
    .exec((err, docs) => {
      if (err) return console.log(err);
      res.status(200).json({
        // message: "all request",
        // user values passed through from auth middleware
        result: docs,
      });
    });
});

router.post('/requestStatus', (req, res) =>
  res.status(200).json({
    status: req.user.status,
    // isReq: req.user.name !== "",
    // time: new Date().toLocaleString("en-US")
  }),
);

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

function sendToRequester(locals) {
  // create the path of email template folder
  const templateDir = path.join(
    __dirname,
    '../',
    'emails',
    'UserNotification',
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
          to: locals.requesterEmail,
          subject: temp.subject,
          text: temp.text,
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
          }
          console.log(`Message sent: ${info.response}`);
        },
      );
    }
  });
}

function sendToVolunteer(locals) {
  // create the path of email template folder
  const templateDir = path.join(
    __dirname,
    '../',
    'emails',
    'VolunteerNotification',
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
          to: locals.volunteerEmail,
          subject: temp.subject,
          text: temp.text,
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
          }
          console.log(`Message sent: ${info.response}`);
        },
      );
    }
  });
}

router.post('/cancelRequest', (req, res) => {
  User.findById({ _id: req.user._id }, (err, data) => {
    console.log(data.accepted);
    if (data.accepted) {
      return res.status(409).json({
        message: 'fail',
      });
    }
    User.findByIdAndUpdate({ _id: req.user._id }, { status: [] }, err => {
      if (err) {
        return res.status(500).json({
          message: err,
        });
      }
      return res.status(200).json({
        message: 'success',
      });
    });
  });
});

router.post('/getVolunteer', (req, res) => {
  User.findOne(
    { email: req.user.volunteerEmail },
    'name email sex major degree car contact',
  )
    .exec()
    .then(function(doc) {
      return res.status(200).json({
        result: doc,
        newAccessToken: req.newAccessToken,
      });
    })
    .catch(() =>
      res.status(500).json({
        message: '未知错误, 请刷新！',
      }),
    );
});

router.post('/acceptRequest', (req, res) => {
  User.findByIdAndUpdate(
    req.body.id,
    {
      accepted: true,
      $push: {
        status: `${req.user.name}接受了你的接机请求 请检查你的邮箱并取得联系`,
      },
      volunteerEmail: req.user.email,
    },
    {
      useFindAndModify: false,
      upsert: true,
    },
    err => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: '接受请求失败',
        });
      }
      return res.status(200).json({
        newAccessToken: req.newAccessToken,
      });
    },
  );
  // User.updateMany(
  //   { _id: { $in: req.body.id } },
  //   {
  //     accepted: true,
  //     $push: {
  //       status: req.user.name + "接受了你的接机请求 请检查你的邮箱并取得联系"
  //     },
  //     volunteerEmail: req.user.email
  //   },
  //   { upsert: true },
  //   err => {
  //     if (err)
  //       res.status(400).json({
  //         success: false,
  //         message: "接受请求失败"
  //       });
  //     else {
  //       var obj_ids = req.body.ids.map(function(id) {
  //         return mongoose.Types.ObjectId(id);
  //       });
  //       User.find({ _id: { $in: obj_ids } }).exec((err, docs) => {
  //         if (err) return console.log(err);
  //         docs.forEach(doc => {
  //           const requesterInfo = {
  //             volunteerName: req.user.name,
  //             volunteerEmail: req.user.email,
  //             name: doc.name,
  //             phone: doc.phone,
  //             email: doc.email,
  //             social: doc.social,
  //             date: new Date(doc.arriveDateTime).toLocaleDateString(),
  //             time: new Date(doc.arriveDateTime).toLocaleTimeString(),
  //             airport: doc.arriveAirport,
  //             hometown: doc.hometown,
  //             school: doc.school,
  //             degree: doc.degree,
  //             luggage: doc.luggage,
  //             toVolunteer: doc.toVolunteer
  //           };
  //           const voluntterInfo = {
  //             requesterEmail: doc.email,
  //             requesterName: doc.name,
  //             name: req.user.name,
  //             email: req.user.email,
  //             contact: req.user.contact,
  //             sex: req.user.sex,
  //             major: req.user.major,
  //             degree: req.user.degree,
  //             car: req.user.car,
  //             sleep: doc.sleep
  //           };
  //           sendToRequester(voluntterInfo);
  //           sendToVolunteer(requesterInfo);
  //         });
  //       });

  //       return res.status(200).json({
  //         success: true,
  //         message: "志愿者已接受你的请求",
  //         // user values passed through from auth middleware
  //         name: req.user.name,
  //         newAccessToken: req.newAccessToken
  //       });
  //     }
  //   }
  // );
  // // console.log(req.user);
});

module.exports = router;
