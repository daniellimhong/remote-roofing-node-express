const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);
const db = require("../config/database");
const Project = require("../models/Project");

const testProject = {
  project_name: "test_project",
  body: "test_body",
  status: "active",
  user_id: 1
};

const { project_name, body, status, user_id } = testProject;

describe("testing the project endpoints", () => {
    test("it should receive response from GET request", async () => {
      const response = await request.get("/projects");
      expect(response.status).toBe(200);
    });
  
    test("it should post and save to database", async (done) => {
      const response = await request.post("/projects/addProject").send(testProject);
      const project = await Project.findOne({ where: { project_name } });

      expect(response.status).toBe(200);
      expect(project.project_name).toBe(project_name);
      expect(project.body).toBe(body);
      expect(project.status).toBe(status);
      expect(project.user_id).toBe(user_id);
      done();
    });
  
    test("it should be deleted from database", async (done) => {
      const deleteProject = await Project.destroy({ where: { project_name } });
  
      const idReset = await db.query(`
      select setval('projects_project_id_seq', (select max(project_id) from projects), true)
      `);
      const idResetValue = parseInt(idReset[0][0].setval);
      const currentCount = await Project.count();
  
      expect(deleteProject).toBe(1);
      expect(idResetValue === currentCount).toBeTruthy();
      done();
    });
  });
