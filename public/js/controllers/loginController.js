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

  get isLoggedIn() {
    return this.LoginService.isLoggedIn;
  }
}

angular.module('app')
  .controller("LoginController", ['LoginService', LoginController]);