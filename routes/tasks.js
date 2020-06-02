const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Task = require("../models/Task");

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.status(200).send(tasks);
  } catch (err) {
    console.error(err);
  }
});

router.post("/addTask", async (req, res) => {
  const {
    task_name,
    description,
    score,
    status,
    user_id,
    project_id,
  } = req.body;

  let errors = [];

  if (!task_name) {
    errors.push({ error: "Please add a task name" });
  }
  if (!description) {
    errors.push({ error: "Please add a description" });
  }
  if (!score) {
    errors.push({ error: "Please add a score" });
  }
  if (!user_id) {
    errors.push({ error: "Please include the user id" });
  }
  if (!project_id) {
    errors.push({ error: "Please include the project id" });
  }

  if (errors.length > 0) {
    errors.forEach((err) => console.log(`Error: ${err.error}`));
    res.json({
      errors,
      task_name,
      description,
      score,
      status,
      user_id,
      project_id,
    });
  } else {
    try {
      const newTask = await Task.create({
        task_name,
        description,
        score, 
        status: status ? status : "active", // if no status given, default to 'active
        user_id,
        project_id
      });
      res.status(200).send(newTask);
    } catch (err) {
      console.error(err);
    }
  }
});

module.exports = router;
