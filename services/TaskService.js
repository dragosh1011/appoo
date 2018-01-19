'use strict';

class TaskService {
  /**
   *
   * @param model
   */
  constructor(model) {
    this._model = model
  }

  /**
   *
   * @returns {Promise.<TResult>}
   */
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

  /**
   *
   * @param data
   */
  create(data) {
    return this._model.create({
      title: data.title,
      description: data.description,
      dueDate: data.dueDate,
      priority: data.priority,
      status: data.status
    });
  }

  /**
   *
   * @param data
   * @returns {*|Promise.<Array.<affectedCount, affectedRows>>}
   */
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

  /**
   *
   * @param title
   * @param newStatus
   * @returns {*|Promise.<Array.<affectedCount, affectedRows>>|*|Promise.<Array.<affectedCount, affectedRows>>}
   */
  changeStatus(title, newStatus) {
    return this._model.update({
      status: newStatus
    }, {
      where: {
        title: title
      }
    })
  }

  /**
   *
   * @param taskId
   * @returns {*|Promise.<Integer>|Promise.<undefined>}
   */
  delete(taskId) {
    return this._model.destroy({
      where: {
        id: taskId
      }
    })
  }
}

module.exports = TaskService;