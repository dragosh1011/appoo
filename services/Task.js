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

  create(data) {
    return this._model.create({
      title: data.title,
      description: data.description,
      dueDate: data.dueDate,
      priority: data.priority,
      status: data.status
    })

  }

  update(data) {
    return this._model.update({
        title: data.title,
        description: data.description,
        dueDate: data.dueDate,
        priority: data.priority,
        status: data.status
      },
      {
        where: {
          id: data.id
        }
      })
  }

  changeStatus(title, newStatus) {
    return this._model.update({
      status : newStatus
    }, {
      where : {
        title : title
      }
    })
  }

  delete(taskId) {
    return this._model.destroy({
      where: {
        id: taskId
      }
    })
  }
}

module.exports = Task;