const express = require('express');
const tasksRouter = require('./tasks');

function createApp() {
  const app = express();
  app.use(express.json());

  app.get('/', (req, res) => {
    res.json({ status: 'ok', service: 'tasktracker-api' });
  });

  app.use('/tasks', tasksRouter);

  return app;
}

module.exports = createApp;
