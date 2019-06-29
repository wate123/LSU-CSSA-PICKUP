// const nodemailer = require('nodemailer');
// const EmailTemplate = require('email-templates').EmailTemplate;
// const config = require('../config/index');
// const path = require('path');
// const Promise = require('bluebird');
//
// const transporter = nodemailer.createTransport({
//     service: 'qq',
//     auth: {
//         user: config.qq,
//         pass: config.pass,
//     }
// });
//
//
// function sendEmail (obj) {
//     return transporter.sendMail(obj);
// }
//
// function loadTemplate (templateName, contexts) {
//     let template = new EmailTemplate(path.join(__dirname, 'mailTemplate', templateName));
//     return Promise.all(contexts.map((context) => {
//         return new Promise((resolve, reject) => {
//             template.render(context, (err, result) => {
//                 if (err) reject(err);
//                 else resolve({
//                     email: result,
//                     context,
//                 });
//             });
//         });
//     }));
// }
//
// loadTemplate('UserNotification', requesterInfo).then((results) => {
//     return Promise.all(results.map((result) => {
//         sendEmail({
//             to: result.context.email,
//             from: config.qq,
//             subject: req.user.name.subject,
//             html: result.email.html,
//             text: result.email.text,
//         });
//     }));
// }).then(() => {
//     console.log('Yay!');
// });
//

// var sendResetPasswordLink = transporter.templateSender(
//     new EmailTemplate('./mailTemplate/resetPassword'), {
//         from: config.qq,
//     });

// exports.sendPasswordReset = function (email, username, name, tokenUrl) {
//     // transporter.template
//     sendResetPasswordLink({
//         to: email,
//         subject: 'LSU CSSA 接机系统 - 密码重置'
//     }, {
//         name: name,
//         username: username,
//         token: tokenUrl
//     }, function (err, info) {
//         if (err) {
//             console.log(err)
//         } else {
//             console.log('Link sent\n'+ JSON.stringify(info));
//         }
//     });
// };
// const email = new Email({
//     message: {
//         from: config.qq
//     },
//     // uncomment below to send emails in development/test env:
//     // send: true
//     transport: {
//         jsonTransport: true
//     }
// });
//
// email
//     .send({
//         template: '/mailTemplate/UserNotification',
//         message: {
//             to: 'elon@spacex.com'
//         },
//         locals: {
//             name: 'Elon'
//         }
//     })
//     .then(console.log)
//     .catch(console.error);
//
//
// const mailOptions = {
//     from: config.qq,
//     to: 'myfriend@yahoo.com',
//     subject: 'Sending Email using Node.js',
//     text: 'That was easy!'
// };
//
// nev.configure({
//     verificationURL: 'http://lsucssa.com/email-verification/${URL}',
//     persistentUserModel: User,
//     tempUserCollection: 'lsucssa_tempusers',
//
//     transportOptions: {
//         service: 'qq',
//         auth: {
//             user: 'myawesomeemail@gmail.com',
//             pass: 'mysupersecretpassword'
//         }
//     },
//     verifyMailOptions: {
//         from: 'Do Not Reply <myawesomeemail_do_not_reply@gmail.com>',
//         subject: 'Please confirm account',
//         html: 'Click the following link to confirm your account:</p><p>${URL}</p>',
//         text: 'Please confirm your account by clicking the following link: ${URL}'
//     }
// }, function(error, options){
// });
//
// nev.generateTempUserModel(User);
//
// // using a predefined file
// var TempUser = require('./models/tempUser');
// nev.configure({
//     tempUserModel: TempUser
// }, function(error, options){
// });
