const request = require('supertest');
const createApp = require('../src/app');
const tasksRouter = require('../src/tasks');

const app = createApp();

beforeEach(() => {
  tasksRouter._reset();
});

describe('GET /tasks', () => {
  it('returns an empty list when no tasks exist', async () => {
    const res = await request(app).get('/tasks');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });
});

describe('POST /tasks', () => {
  it('creates a task and returns it', async () => {
    const res = await request(app).post('/tasks').send({ title: 'Write training deck' });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ title: 'Write training deck', done: false });
    expect(res.body.id).toBeDefined();
  });

  it('rejects a task with no title', async () => {
    const res = await request(app).post('/tasks').send({});
    expect(res.status).toBe(400);
  });
});

describe('GET /tasks/:id', () => {
  it('returns 404 for a task that does not exist', async () => {
    const res = await request(app).get('/tasks/999');
    expect(res.status).toBe(404);
  });
});

describe('PATCH /tasks/:id', () => {
  it('marks a task as done', async () => {
    const created = await request(app).post('/tasks').send({ title: 'Ship feature' });
    const res = await request(app).patch(`/tasks/${created.body.id}`).send({ done: true });
    expect(res.status).toBe(200);
    expect(res.body.done).toBe(true);
  });
});
