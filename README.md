# Remote Roofing Server

**Current Status:** Deployed & In-Production

## How To Test

Test post endpoints with [Postman](https://web.postman.co/) or [API Tester](https://apitester.com/) and test get endpoints via browser

Post User JSON Example

```json
// https://nameless-ravine-28120.herokuapp.com/users/addUser
{
  "name": "Daniel",
  "surname": "Hong",
  "email": "daniel@test.com"
}
```

Post Task JSON Example

```json
// https://nameless-ravine-28120.herokuapp.com/tasks/addTask
{
  "task_name": "Deployment",
  "description": "deploy node server to heroku",
  "score": 8,
  "status": "active",
  "user_id": 1,
  "project_id": 1
}
```

```json
// https://nameless-ravine-28120.herokuapp.com/users/addUser
{
  "project_name": "daniel's project",
  "body": "remote roofing node server",
  "status": "active",
  "user_id": 1
}
```

### Endpoints

- GET /API/users - https://nameless-ravine-28120.herokuapp.com/users
- GET /API/tasks - https://nameless-ravine-28120.herokuapp.com/tasks
- GET /API/projects - https://nameless-ravine-28120.herokuapp.com/projects
- POST /API/users - https://nameless-ravine-28120.herokuapp.com/users/addUser
- POST /API/tasks - https://nameless-ravine-28120.herokuapp.com/tasks/addTask
- POST /API/projects - https://nameless-ravine-28120.herokuapp.com/projects/addProject

---

## Models

```javascript
const User = db.define("user", {
  user_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  surname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const Project = db.define("project", {
  project_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  project_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  body: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: "user_id",
    },
  },
});

const Task = db.define("task", {
  task_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  task_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  score: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: "user_id",
    },
  },
  project_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Project,
      key: "project_id",
    },
  },
});
```
#### Relations
- Project model references users via user_id
- Task model references both users and projects via user_id and project_id respectively

## Dependencies

- express
- sequelize
- pg
- pg-hstore
- dotenv
- body-parser
- nodemon
- jest
- supertest
- sequelize-cli

### Checklist

- [x] Organize, design, test, document, and deploy code
- [x] Node.js server using Express, Sequelize, & PostgreSQL (heroku)
- [x] User Input Validation
- [x] Endpoints
- [x] ES6/7 & Async/Await
- [x] Test coverage 