'use strict';
const appLink = 'localhost:3001';
const uuid = require('uuid');
const nodemailer = require('nodemailer');
const mailConfig = require('../config/reset-password-mail');

const {User} = require('../models');
const UserNotFound = require('../errors/UserNotFound');

const tokenExpiration = 3600000; // 1 hour

module.exports = (email) => {
  const token = uuid();
  return User.findOne({where: {email}})
    .then(user => {

    if (!user) {
      throw new UserNotFound(email)
    }

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + tokenExpiration;
    return user.save();
  }).then(()=> {
    const transporter = nodemailer.createTransport('SMTP', {
      service: 'gmail',
      auth: mailConfig.auth
    });

    const mailOptions = {
      to: email,
      from: mailConfig.auth.user,
      subject: 'Password reset',
      html: getMessage(getLink(email, token))
    };
    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
          reject(err);
        }
        else {
         resolve();
        }
      });
    });
  });
};

function getMessage (link) {
  return `You are receiving this because you (or someone else) have requested the reset of the password for your account.</br></br>
Please click on the following link: </br></br>
<a href="${link}">${link}</a> </br></br>
If you did not request this, please ignore this email and your password will remain unchanged.</br>
`
}

function getLink (email, token) {
  return `${appLink}/?email=${email}&token=${token}`
}
