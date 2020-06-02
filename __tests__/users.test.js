const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);
const db = require("../config/database");
const User = require("../models/User");

const testUser = {
  name: "test_name",
  surname: "test_surname",
  email: "test@asdfjkl.com"
};

const { name, surname, email } = testUser;

describe("testing the user endpoints", () => {
  test("it should receive response from GET request", async () => {
    const response = await request.get("/users");
    expect(response.status).toBe(200);
  });

  test("it should post and save to database", async (done) => {
    const response = await request.post("/users/addUser").send(testUser);
    const user = await User.findOne({ where: { email } });

    expect(response.status).toBe(200);
    expect(user.name).toBe(name);
    expect(user.surname).toBe(surname);
    done();
  });

  test("it should be deleted from database", async (done) => {
    const deleteUser = await User.destroy({ where: { email } });

    // testing the reseted user_id sequence
    const idReset = await db.query(`
    select setval('users_user_id_seq', (select max(user_id) from users), true)
    `);

    const idResetValue = parseInt(idReset[0][0].setval);
    const currentCount = await User.count();

    expect(deleteUser).toBe(1);
    expect(idResetValue === currentCount).toBeTruthy();
    done();
  });
});
