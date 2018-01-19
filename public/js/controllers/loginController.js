'use strict';
class LoginController {
  constructor(LoginService, $location) {
    this.LoginService = LoginService;
    this.$location = $location;

    this.loginButton = false;
    this.registerButton = false;
    this.resetButton = false;
    this.resetPasswordButton = false;
  }

  $onInit() {
    let token = this.getParameterByName('token');

    if (!token) {
      return false;
    }
    
    this.resetPasswordButton = true;
    this.resetToken = token;
  }

  updatePassword(password) {
    if (!this.resetToken) {
      return alert('Token is missing in your link');
    }

    this.LoginService.updatePassword(this.resetToken, password).then(() => {
      alert('Password successfuly changed');
      this.resetPasswordButton = false;
    }).catch(() => {
      alert('Unexpected error occured. Please try again later');
    });
  }

  getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  logout() {
    this.LoginService.logout();
    alert("Successful logout");
  }

  login(user) {
    this.LoginService.login(user)
      .then(() => {
        alert("Successful Login");
        Object.assign(user, {
          username: "",
          password: ""
        });
      })
      .catch((err) => {
        this.loginError = "Invalid username or password";
      });
  }

  register(newUser) {
    console.log(newUser);
    if (!newUser) {
      return this.registerError = "Please enter both username and password";
    }
    if (!newUser.username || !newUser.password) {
      return this.registerError = "Please try again";
    }
    else {
      this.LoginService.register(newUser)
        .then(() => {
          alert("Successful Registration");
          Object.assign(newUser, {
            username: "",
            password: ""
          });
        })
        .catch(() => {
          this.registerError = "Please try again";
        });
    };
  }

  resetPassword(email) {
    this.LoginService.resetPassword(email).then(() => {
      alert('Password successful reseted, please check your email address.');
    }).catch(() => {
      alert('Unexpected error, please check your email address and try again.')
    })
  }

  get isLoggedIn() {
    return this.LoginService.isLoggedIn;
  }
}

angular.module('app')
  .controller("LoginController", ['LoginService', '$location', LoginController]);