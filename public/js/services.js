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
    return $http.put('/api/status', updateObj);
  }

}

class LoginService {
  constructor($http) {
    this.$http = $http;

    this.isLoggedIn = false;
  }

  get() {
    return this.isLoggedIn;
  }

  logout() {
    return this.$http.get('/logout')
      .then(() => {
        this.isLoggedIn = false;
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
}

angular.module('app')
  .service('TaskService', ['$http', TaskService])
  .service('LoginService', ['$http', LoginService])