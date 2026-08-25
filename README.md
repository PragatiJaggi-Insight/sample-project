# TaskTracker API

A minimal Express + Jest REST API used as the running sample project for the **GitHub for Interns** 5-day training.

## Endpoints

| Method | Path         | Description                                    |
|--------|--------------|-------------------------------------------------|
| GET    | /tasks       | List all tasks (optional `?done=true\|false`)    |
| POST   | /tasks       | Create a task (`{ "title": "..." }`)             |
| GET    | /tasks/:id   | Get one task                                     |
| PATCH  | /tasks/:id   | Update `title` and/or `done`                     |
| DELETE | /tasks/:id   | Delete a task                                    |

## Getting started

```bash
npm install
npm start        # runs on http://localhost:3000
npm test         # runs the Jest test suite
```

## Using this repo for training

This repository is intentionally minimal. Interns will extend it over the 5-day program:

- **Day 1**: practice Issues, branch protection and PR merge strategies against this repo.
- **Day 2**: add a `.github/workflows/ci.yml` that installs dependencies and runs `npm test` on every pull request.
- **Day 3**: create a Project board, an issue template, and publish a tagged release.
- **Day 4**: intentionally introduce and then fix a vulnerable dependency and a leaked secret.
- **Day 5**: use GitHub Copilot to explain, extend, and test this code.

See `Hands-On-Lab-Guide.md` in the training repository for full step-by-step instructions.
