const express = require('express');
const User = require('mongoose').model('User');
require('dotenv').config();
// const config = require('../../config/index');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { EmailTemplate } = require('email-templates');
const router = new express.Router();
const path = require('path');
const moment = require('moment');

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
    'mailTemplate',
    'userInfoUpdate',
    'requester',
  );

  const testMailTemplate = new EmailTemplate(templateDir);

  // let locals = {
  //     userName: "XYZ" //dynamic data for bind into the template
  // };

  testMailTemplate.render(locals, (err, temp) => {
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
          // console.log('Message sent: '+ info.response );
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
    'mailTemplate',
    'userInfoUpdate',
    'volunteer',
  );

  const testMailTemplate = new EmailTemplate(templateDir);

  // let locals = {
  //     userName: "XYZ" //dynamic data for bind into the template
  // };

  testMailTemplate.render(locals, (err, temp) => {
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
          // console.log('Message sent: ' + info.response);
        },
      );
    }
  });
}

router.post('/newRequest', (req, res) => {
  const new_info = {
    name: req.body.name,
    sex: req.body.sex,
    hometown: req.body.hometown,
    school: req.body.school,
    degree: req.body.degree,
    arriveDateTime: req.body.dateTime,
    arriveAirport: req.body.airport,
    luggage: req.body.luggage,
    friends: req.body.friends,
    sleep: req.body.sleep,
    phone: req.body.phone,
    social: req.body.social,
    toVolunteer: req.body.toVolunteer,
    toCssa: req.body.toCSSA,
    joinMail: req.body.joinmail,
    status: req.body.status.split('|'),
    accepted: req.body.accepted,
    isVolunteer: req.body.isVolunteer,
  };
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, process.env.jwtSecret, (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) {
      return res.status(401).json({
        message: '请登录',
      });
    }
    const userId = decoded.id;
    const payload = {
      id: req.userId,
      email: req.user.email,
      name: new_info.name,
      isVolunteer: new_info.isVolunteer,
    };
    const newToken = jwt.sign(payload, process.env.jwtSecret, {
      expiresIn: '4d',
    });
    // if (new_info.joinmail === true) {
    //   const transporter = nodemailer.createTransport({
    //     host: "smtp.office365.com",
    //     port: 587,
    //     secureConnection: false,
    //     auth: {
    //       user: process.env.myemail,
    //       pass: process.env.mypass
    //     },
    //     tls: {
    //       ciphers: "SSLv3"
    //     }
    //   });
    //   transporter.sendMail(
    //     {
    //       from: process.env.myemail,
    //       to: " LISTSERV@LISTSERV.LSU.EDU",
    //       text: "ADD CSSA-L " + req.user.email
    //     },
    //     function(error, info) {
    //       if (error) {
    //         console.log(error);
    //       }
    //       console.log("User joined maillist initial request! ");
    //       // console.log('Message sent: ' + info.response);
    //     }
    //   );
    // }
    if (req.user.accepted && req.user.status.length !== 0) {
      // TODO keep the volunteer up to date meanwhile send a confirmed message to requester.
      return res.status(200).json({
        message: '系统已收到你的更改接机请求, 志愿者将会收到你的更改信息',
        token: newToken,
        name: req.user.name,
      });
    }
    User.findByIdAndUpdate(
      userId,
      new_info,
      { upsert: true },
      (err, firstTimeDoc) => {
        if (err) {
          console.log('first time or new insert doc fail ' + err);
        } else {
          return res.status(200).json({
            message: '系统已收到你的接机请求, 请耐心等待志愿者接受你的请求',
            token: newToken,
            name: firstTimeDoc.name,
          });
        }
      },
    );
  });
});

router.post('/volunteer', (req, res) => {
  const new_info = {
    name: req.body.name,
    sex: req.body.sex,
    major: req.body.major,
    degree: req.body.degree,
    car: req.body.car,
    contact: req.body.contact,
    toCssa: req.body.toCSSA,
    joinMail: req.body.joinmail,
    isVolunteer: true,
    accepted: true,
  };
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, process.env.jwtSecret, (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) {
      return res.status(401).json({
        message: '请登录',
      });
    }
    const payload = {
      id: req.user._id,
      email: req.user.email,
      name: req.user.name,
      isVolunteer: true,
    };
    const newToken = jwt.sign(payload, process.env.jwtSecret, {
      expiresIn: '4d',
    });
    if (req.body.joinmail == 'true') {
      const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secureConnection: false,
        auth: {
          user: process.env.myemail,
          pass: process.env.mypass,
        },
        tls: {
          ciphers: 'SSLv3',
        },
      });
      transporter.sendMail(
        {
          from: process.env.myemail,
          to: ' LISTSERV@LISTSERV.LSU.EDU',
          text: 'ADD CSSA-L ' + req.user.email,
        },
        function(error, info) {
          if (error) {
            console.log(error);
          }
          // console.log('Message sent: ' + info.response);
          console.log('Volunteer joined maillist! ');
        },
      );
    }
    User.findByIdAndUpdate(
      { _id: req.user._id },
      new_info,
      { upsert: true, new: true },
      (err, firstTimeDoc) => {
        if (err) {
          console.log('first time or new insert doc fail ' + err);
        } else {
          return res.status(200).json({
            message: '申请成为志愿者成功！',
            token: newToken,
            name: firstTimeDoc.name,
          });
        }
      },
    );
  });
});

router.post('/userInfo', (req, res) => {
  const user_info = {
    email: req.user.email,
    name: req.body.name,
    sex: req.body.sex,
    hometown: req.body.hometown,
    school: req.body.school,
    degree: req.body.degree,
    arriveDateTime: req.body.dateTime,
    arriveAirport: req.body.airport,
    luggage: req.body.luggage,
    friends: req.body.friends,
    sleep: req.body.sleep,
    phone: req.body.phone,
    social: req.body.social,
    toVolunteer: req.body.toVolunteer,
    toCssa: req.body.toCSSA,
    joinMail: req.body.joinmail,
    // status: req.body.status,
    accepted: req.body.accepted,
    isVolunteer: req.body.isVolunteer,
    major: req.body.major,
    car: req.body.car,
    contact: req.body.contact,
  };
  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(' ')[1];
  // decode the token using a secret key-phrase
  jwt.verify(token, process.env.jwtSecret, (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) {
      return res.status(401).json({
        message: '请登录',
      });
    }
    const userId = decoded.id;
    const payload = {
      id: userId,
      email: req.user.email,
      name: req.user.name,
      isVolunteer: req.body.isVolunteer,
    };
    const newToken = jwt.sign(payload, process.env.jwtSecret, {
      expiresIn: '4d',
    });
    if (req.body.joinmail == 'true') {
      const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secureConnection: false,
        auth: {
          user: process.env.myemail,
          pass: process.env.mypass,
        },
        tls: {
          ciphers: 'SSLv3',
        },
      });
      transporter.sendMail(
        {
          from: process.env.myemail,
          to: ' LISTSERV@LISTSERV.LSU.EDU',
          text: 'ADD CSSA-L ' + req.user.email,
        },
        function(error, info) {
          if (error) {
            console.log(error);
          }
          console.log('User joined maillist after initial request! ');
          // console.log('Message sent: ' + info.response);
        },
      );
    }
    User.findById(userId, (err, docs) => {
      if (err) {
        return res.status(500).json({
          message: '未知错误, 请刷新',
        });
      } else {
        if (docs.name === '') {
          user_info['accepted'] = false;
          User.findByIdAndUpdate(
            userId,
            user_info,
            { upsert: true, new: true },
            (err, firstTimeDoc) => {
              if (err) {
                console.log('first time insert doc fail ' + err);
              } else {
                return res.status(200).json({
                  message:
                    '系统已收到你的接机请求, 请耐心等待志愿者接受你的请求',
                  token: newToken,
                  name: firstTimeDoc.name,
                });
              }
            },
          );
        } else {
          if (docs.accepted && docs.volunteerEmail != null) {
            User.findOne(
              { email: docs.volunteerEmail },
              (err, volunteerInfo) => {
                if (err) {
                  console.log("can't find volunteer " + err);
                } else {
                  const requester = {
                    requesterEmail: req.user.email,
                    requesterName: docs.name,
                    volunteerName: volunteerInfo.name,
                    name: volunteerInfo.name,
                    email: volunteerInfo.email,
                    contact: volunteerInfo.contact,
                    sex: volunteerInfo.sex,
                    major: volunteerInfo.major,
                    degree: volunteerInfo.degree,
                    car: volunteerInfo.car,
                  };
                  sendToRequester(requester);
                  const requesterInfo = {
                    volunteerName: volunteerInfo.name,
                    volunteerEmail: volunteerInfo.email,
                    name: docs.name,
                    phone: docs.phone,
                    email: docs.email,
                    social: docs.social,
                    date: new Date(docs.arriveDateTime).toLocaleDateString(),
                    time: new Date(docs.arriveDateTime).toLocaleTimeString(),
                    arriveAirport: docs.arriveAirport,
                    hometown: docs.hometown,
                    school: docs.school,
                    degree: docs.degree,
                    luggage: docs.luggage,
                    toVolunteer: docs.toVolunteer,
                  };
                  let diffObj = {};
                  for (let field in requesterInfo) {
                    if (field === 'volunteerEmail' || field === 'volunteerName')
                      diffObj[field] = requesterInfo[field];
                    else if (field === 'date') {
                      const newDate = moment(req.body.dateTime).format(
                        'YYYY-MM-DD',
                      );
                      const oldDate = moment(docs.arriveDateTime).format(
                        'YYYY-MM-DD',
                      );
                      console.log('new ' + newDate);
                      console.log('old ' + oldDate);
                      if (newDate !== oldDate) diffObj[field] = newDate;
                    } else if (field === 'time') {
                      const newTime = moment(req.body.dateTime).format(
                        'HH:mm:ss',
                      );
                      const oldTime = moment(docs.arriveDateTime).format(
                        'HH:mm:ss',
                      );
                      console.log('new ' + newTime);
                      console.log('old ' + oldTime);
                      if (newTime !== oldTime) diffObj['time'] = newTime;
                    } else if (field === 'name') {
                      diffObj[field] = req.body.name;
                    } else if (field === 'email') {
                      diffObj[field] = req.user.email;
                    } else {
                      if (user_info[field] !== requesterInfo[field]) {
                        diffObj[field] = user_info[field];
                      }
                    }
                  }
                  // console.log(diffObj);
                  sendToVolunteer(diffObj);
                  // delete diffObj['volunteerName'];
                  // delete diffObj["date"];
                  // delete diffObj["time"];
                  // diffObj["arriveDateTime"] = req.body.dateTime;
                  User.findByIdAndUpdate(
                    userId,
                    user_info,
                    { new: true },
                    (err, changeDoc) => {
                      if (err) {
                        console.log(
                          'volunteer already accepted and insert doc fail ' +
                            err,
                        );
                      } else {
                        return res.status(200).json({
                          message:
                            '系统已收到你更改的接机请求, 并已通过邮箱通知了' +
                            volunteerInfo.name,
                          token: newToken,
                          name: changeDoc.name,
                        });
                      }
                    },
                  );
                }
              },
            );
          } else {
            user_info['accepted'] = false;
            User.findByIdAndUpdate(
              userId,
              user_info,
              { new: true },
              (err, changeDoc) => {
                if (err) {
                  console.log(
                    'volunteer not accepted your request and insert doc fail ' +
                      err,
                  );
                } else {
                  return res.status(200).json({
                    message: '系统已收到你更改的接机请求',
                    token: newToken,
                    name: changeDoc.name,
                  });
                }
              },
            );
          }
        }
      }
    });
  });
});

module.exports = router;
