'use strict';

class Task {
  constructor (model) {
    this._model = model
  }

  findAll() {
    return this._model.findAll()
      .then((tasks) => {
        let tasksArr = [];
        tasks.forEach((eachTask) => {
          tasksArr.push({
            id: eachTask.id,
            title: eachTask.title,
            description: eachTask.description,
            dueDate: eachTask.dueDate,
            priority: eachTask.priority,
            status: eachTask.status
          });
        });
        return tasksArr;
      });
  }
}

module.exports = Task;