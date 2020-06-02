const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Project = require("../models/Project");

router.get("/", async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.status(200).send(projects);
  } catch (err) {
    console.error(err);
  }
});

router.post("/addProject", async (req, res) => {
  const { project_name, body, status, user_id } = req.body;

  let errors = [];

  if (!project_name) {
    errors.push({ error: "Please add a project name" });
  }
  if (!body) {
    errors.push({ error: "Please add a body" });
  }
  if (!user_id) {
    errors.push({ error: "Please include the user id" });
  }

  if (errors.length > 0) {
    errors.forEach((err) => console.log(`Error: ${err.errors}`));
    res.json({
      errors,
      project_name,
      body,
      status,
      user_id
    });
  } else {
      try {
          const newProject = await Project.create({
              project_name,
              body,
              status: status ? status : 'active', // if no status given, default to 'active
              user_id
          });
          res.status(200).send(newProject);
      } catch (err) {
          console.error(err);
      }
  }
});

module.exports = router;
