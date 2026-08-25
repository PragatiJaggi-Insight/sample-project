const express = require('express');

const router = express.Router();

// In-memory store - resets whenever the process restarts (fine for training purposes).
let tasks = [];
let nextId = 1;

router.get('/', (req, res) => {
  const { done } = req.query;
  if (done === undefined) {
    return res.json(tasks);
  }
  const filterDone = done === 'true';
  return res.json(tasks.filter((t) => t.done === filterDone));
});

router.post('/', (req, res) => {
  const { title } = req.body;
  if (!title || typeof title !== 'string') {
    return res.status(400).json({ error: 'title is required' });
  }
  const task = { id: nextId++, title, done: false };
  tasks.push(task);
  return res.status(201).json(task);
});

router.get('/:id', (req, res) => {
  const task = tasks.find((t) => t.id === Number(req.params.id));
  if (!task) {
    return res.status(404).json({ error: 'task not found' });
  }
  return res.json(task);
});

router.patch('/:id', (req, res) => {
  const task = tasks.find((t) => t.id === Number(req.params.id));
  if (!task) {
    return res.status(404).json({ error: 'task not found' });
  }
  if (typeof req.body.done === 'boolean') {
    task.done = req.body.done;
  }
  if (typeof req.body.title === 'string' && req.body.title.length > 0) {
    task.title = req.body.title;
  }
  return res.json(task);
});

router.delete('/:id', (req, res) => {
  const before = tasks.length;
  tasks = tasks.filter((t) => t.id !== Number(req.params.id));
  if (tasks.length === before) {
    return res.status(404).json({ error: 'task not found' });
  }
  return res.status(204).send();
});

// Exposed for tests only, so each test file can start from a clean slate.
router._reset = () => {
  tasks = [];
  nextId = 1;
};

module.exports = router;
