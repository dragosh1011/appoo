class TaskService {
  constructor($http) {
    this.$http = $http;
  }

  getTasks() {
    return this.$http.get('/api/tasks');
  }

  addTask(task) {
    return this.$http.post('/api/tasks', task);
  }

  saveTask(task) {
    return this.$http.put('/api/tasks', task);
  }

  deleteTask(task) {
    return this.$http({
      url: '/api/tasks',
      method: 'DELETE',
      data: task,
      headers: { "Content-Type": "application/json;charset=utf-8" }
    });
  }

  updateStatus(updateObj) {
    return this.$http.put('/api/status', updateObj);
  }

}

class LoginService {
  constructor($http) {
    this.$http = $http;

    this.isLoggedIn = false;

    this.init();
  }

  init() {
    if (localStorage.getItem('user') && localStorage.getItem('not-password')) {
      this.login({
        username: localStorage.getItem('user'),
        password: localStorage.getItem('not-password')
      });
    }
  }

  updatePassword(token, password) {
    return this.$http.post('/change-password', { token, password });
  }

  get() {
    return this.isLoggedIn;
  }

  logout() {
    return this.$http.get('/logout')
      .then(() => {
        this.isLoggedIn = false;

        localStorage.removeItem('user');
        localStorage.removeItem('not-password');
      })
  }

  login(user) {
    return this.$http({
      url: '/login',
      method: 'POST',
      data: user,
      headers: { "Content-Type": "application/json;charset=utf-8" }
    }).then((response) => {
      if (response.status === 200) {
        this.isLoggedIn = true;

        localStorage.setItem('user', user.username);
        localStorage.setItem('not-password', user.password);
      };

      if (response.status !== 200) {
        console.log('ERROR');
      };
    });
  }

  register(user) {
    return this.$http.post('/register', user)
      .then((response) => {
        if (response.status === 200) {
          this.isLoggedIn = true;
        };
        if (response.status !== 200) {
          console.log('ERROR');
        };
      });
  }

  resetPassword(email) {
    return this.$http.post('/reset-password', { email });
  }
}

angular.module('app')
  .service('TaskService', ['$http', TaskService])
  .service('LoginService', ['$http', LoginService])