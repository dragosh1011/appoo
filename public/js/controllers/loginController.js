'use strict';
class LoginController {
  constructor(LoginService) {
    this.LoginService = LoginService;
  }

  logout() {
    this.LoginService.logout();
    alert("Successful logout");
  }

  login(user) {
    this.LoginService.login(user)
          .then(function () {
            alert("Successful Login");
            Object.assign(user, {
              username: "",
              password: ""
            });
          })
          .catch(function (err) {
            this.loginError = "Invalid username or password";
          });
  }

  register(newUser) {
    if (newUser === undefined) {
      return this.registerError = "Please enter both username and password";
    }
    if (!newUser.username || !newUser.password) {
      return this.registerError = "Please try again";
    }
    else {
      LoginService.register(newUser)
        .then(function () {
          alert("Successful Registration");
          Object.assign(newUser, {
            username: "",
            password: ""
          });
        })
        .catch(function () {
          this.registerError = "Please try again";
        });
    };
  }

  get isLoggedIn() {
    return this.LoginService.isLoggedIn;
  }
}

angular.module('app')
    .controller("LoginController", ['LoginService', LoginController]);