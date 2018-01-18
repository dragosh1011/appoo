'use strict';
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const bcrypt = require('bcrypt');

class AuthenticationService {
  constructor (userModel) {
    this._userModel = userModel
  }

  initialize() {
    passport.use(new LocalStrategy(
      (username, password, done) => {
        this._userModel.findOne({
          where: {username: username}
        })
          .then((User) => {
            if (User === null) {
              return done(null, false);
            }
            bcrypt.compare(password, User.password, function (err, boolean) {
              if (boolean === false) {
                return done(null, false)
              }
              let USERNAME = User.username;
              let user = {
                username: USERNAME
              };
              return done(null, user);
            });
          })
          .catch((error) => {
            throw new Error(error);
          });
      })
    );

    passport.serializeUser((user, done) => {
      return done(null, user);
    });
    passport.deserializeUser((user, done) => {
      return done(null, user);
    });
  }

  isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.send(401);
  }
}

module.exports = AuthenticationService;