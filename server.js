'use strict';

const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  path = require('path'),
  db = require('./models'),
  Users = db.User,
  passport = require('passport'),
  session = require('express-session'),
  bcrypt = require('bcrypt'),
  AuthenticationService = require('./services/AuthenticationService'),
  registerTasksRoutes = require('./routes/tasks'),
  registerUsersRoutes = require('./routes/user');

const authenticationService = new AuthenticationService(Users);

const env = process.env.NODE_ENV || 'development';

app.set('port', process.env.PORT || 3001);
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({type: 'application/json'}));

if (env === "development") {
  const CONFIG = require(__dirname + '/config/config.json');
  app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: CONFIG.session.secret
  }));
}
else {
  app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SECRET
  }));
}

app.use(passport.initialize());
app.use(passport.session());
authenticationService.initialize();

registerTasksRoutes(app);
registerUsersRoutes(app);

//Sync Database and Start Server
db.sequelize.sync().then(function () {
  app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
  });
});