'use strict';

const bcrypt = require('bcrypt'),
  db = require('../models'),
  Users = db.User,
  passport = require('passport');
const sendEmail = require('../services/sendEmail');
const InvalidTokenError = require('../errors/InvalidTokenError');
const saltRounds = 10;

module.exports = function registerRoutes(app) {

  app.get('/logout', (req, res) => {
    req.logout();
    console.log('Logging out');
    res.redirect('/');
  });

  app.post('/login', passport.authenticate('local'), (req, res) => {
    res.send(req.body);
  });

  app.post('/register', (req, res) => {
    let pw = req.body.password;
    bcrypt.hash(pw, saltRounds, function (err, hash) {
      Users.create({
        username: req.body.username,
        password: hash,
        email: req.body.email
      })
        .then((user) => {
          return res.json(user);
        })
        .catch((error) => {
          return sendErorr(error, res);
        });
    });
  });

  app.post('/reset-password', (req, res) => {
    sendEmail(req.body.email).then(() => {
      res.status(204).end();
    }).catch((error) => {
      sendErorr(error, res);
    });
  });

  app.post('/change-password', (req, res) => {
    let pw = req.body.password;
    Users.findOne({
      where: {
        resetPasswordToken: req.body.token,
        resetPasswordExpires: {gte: Date.now()}
      }
    }).then(user => {
      if (!user) {
        throw new InvalidTokenError()
      }

      return new Promise((resolve, reject)=> {
        bcrypt.hash(pw, saltRounds, function (err, hash) {
          if (err) {
            reject(err);
          }

          user.hash = hash;
          user.resetPasswordToken = null;
          user.resetPasswordExpires = null;
          resolve(user.save());
        })
      });
    }).then(() => {
      res.status(204).end();
    }).catch(error => {
      sendErorr(error, res);
    });
  });
};

function sendErorr(error, res) {
  if (error.code) {
    res.status(error.code);
  }
  res.send(error);
}
