'use strict';
class LoginController {
  constructor(LoginService) {
    this.LoginService = LoginService;

    this.loginButton = false; 
    this.registerButton = false; 
    this.resetButton=false;
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
  .controller("LoginController", ['LoginService', LoginController]);