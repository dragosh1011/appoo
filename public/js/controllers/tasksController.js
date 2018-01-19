'use strict';
class TasksController {
  constructor($scope, TaskService, dragulaService, LoginService) {
    this.$scope = $scope;
    this.TaskService = TaskService;
    this.dragulaService = dragulaService;
    this.LoginService = LoginService;

    this.tasks = [];
  }

  $onInit() {
    this.TaskService.getTasks().then((response) => {
      this.tasks = response.data.tasks;
    });

    this.$scope.$on('status-bag.drop', (error, element) => {
      var status = element[0].parentNode.id;
      var titleElement = element[0].querySelectorAll('p')[0];
      var titleArr = titleElement.innerHTML.split(" ");
      titleArr.shift();
      var title = titleArr.join(' ');
      var updateObj = {
        title: title,
        newStatus: status
      };

      this.TaskService.updateStatus(updateObj).success((response) => {
        this.tasks = response.tasks;
      });
    });

  }

  checkLogin() {
    if (!this.LoginService.get()) {
      alert("Please login to use this service");
    }

    return this.LoginService.get();
  }

  addTask(task) {
    if (task === undefined) {
      return alert("Please enter all task fields");
    }

    if (!this.LoginService.get()) {
      return alert("Please log in to use this service");
    }

    if (!task.title || !task.priority || !task.dueDate) {
      return alert("Please enter all task fields");
    }

    if (!task.status) {
      task.status = notStarted;
    }

    task.dueDate = moment(task.dueDate).format('dddd, MMMM, DD');

    this.TaskService.addTask(task).success((response) => {
      this.tasks = response.tasks;
    }).then(() => {
      Object.assign(task, {
        title: "",
        description: "",
        dueDate: "",
        priority: "",
        status: ""
      });
    });
  }

  saveTask(task) {
    if (!this.LoginService.get()) {
      return alert("Please login to use this service");;
    }

    this.TaskService.saveTask(task).success(function (response) {
      this.tasks = response.tasks;
    });
  };

  editTask() {
    if (!this.LoginService.get()) {
      alert("Please login to use this service");
    }

    return this.LoginService.get();
  }

  deleteTask(task) {
    if (!this.LoginService.get()) {
      alert("Please login to use this service");
    }

    this.TaskService.deleteTask(task).success((response) => {
      this.tasks = response.tasks;
    });
  };

}

angular.module('app')
  .controller('tasksController', ['$scope', 'TaskService', 'dragulaService', 'LoginService', TasksController]);