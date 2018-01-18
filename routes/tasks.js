'use strict';
const TaskService = require('../services/TaskService'),
  db = require('../models'),
  Tasks = db.Task,
  taskService = new TaskService(Tasks);

module.exports = function registerRoutes(app) {
//GET
  app.get('/api/tasks', (req, res) => {
    taskService.findAll()
      .then((tasks) => {
        res.json({tasks});
      });
  });


//POST
  app.post('/api/tasks', (req, res) => {
    taskService
      .create(req.body)
      .then(function () {
        taskService.findAll()
          .then((tasks) => {
            res.json({tasks});
          });
      });
  });

//PUT
  app.put('/api/tasks', (req, res) => {
    taskService
      .update(req.body)
      .then(function () {
        taskService.findAll()
          .then((tasks) => {
            res.json({tasks});
          });
      });
  });

  app.put('/api/status', (req, res) => {
    taskService
      .changeStatus(req.body.title, req.body.newStatus)
      .then(function () {
        taskService
          .findAll()
          .then((tasks) => {
            res.json({tasks});
          });
      });
  });

//DELETE
  app.delete('/api/tasks', (req, res) => {
    taskService
      .delete(req.body.id)
      .then(() => {
        taskService.findAll()
          .then((tasks) => {
            res.json({tasks});
          });
      });
  });

};
