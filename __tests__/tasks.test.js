const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);
const db = require("../config/database");
const Task = require("../models/Task");

const testTask = {
  task_name: "test_project",
  description: "description",
  score: 10,
  status: "active",
  user_id: 1,
  project_id: 1,
};

const {
  task_name,
  description,
  score,
  status,
  user_id,
  project_id,
} = testTask;

describe("testing the tasks endpoints", () => {
  test("it should receive response from GET request", async () => {
    const response = await request.get("/tasks");
    expect(response.status).toBe(200);
  });

  test("it should post and save to database", async (done) => {
    const response = await request
      .post("/tasks/addTask")
      .send(testTask);
    const task = await Task.findOne({ where: { task_name } });

    expect(response.status).toBe(200);
    expect(task.task_name).toBe(task_name);
    expect(task.description).toBe(description);
    expect(task.score).toBe(score);
    expect(task.status).toBe(status);
    expect(task.user_id).toBe(user_id);
    expect(task.project_id).toBe(project_id);
    done();
  });

  test("it should be deleted from database", async (done) => {
    const deleteTask = await Task.destroy({ where: { task_name } });

    const idReset = await db.query(`
      select setval('tasks_task_id_seq', (select max(task_id) from tasks), true)
      `);
    const idResetValue = parseInt(idReset[0][0].setval);
    const currentCount = await Task.count();

    expect(deleteTask).toBe(1);
    expect(idResetValue === currentCount).toBeTruthy();
    done();
  });
});
