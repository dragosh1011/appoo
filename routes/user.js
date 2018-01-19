'use strict';

const bcrypt = require('bcrypt'),
  db = require('../models'),
  Users = db.User,
  passport = require('passport');
const sendEmail = require('../services/sendEmail')

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
    const saltRounds = 10;
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
        .catch((err) => {
          return res.send(err);
        });
    });
  });

  app.post('/reset-password', (req, res) => {
    sendEmail(req.body.email).then(response => {
      console.log(response);
      res.send('Message was sent');
    }).catch((error) => {
      res.send(error);
    });
  });
};
