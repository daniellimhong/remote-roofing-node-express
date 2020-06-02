const express = require("express");
const router = express.Router();
const db = require("../config/database");
const User = require("../models/User");

//Get users
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).send(users);
  } catch (err) {
    console.error(err);
  }
});

// Add user
router.post("/addUser", async (req, res) => {
  const { name, surname, email } = req.body;

  // console.log(name, surname, email);

  let errors = [];

  // Form validation
  if (!name) {
    errors.push({ error: "Please add a name" });
  }
  if (!surname) {
    errors.push({ error: "Please add a surname" });
  }
  if (!email) {
    errors.push({ error: "Please add an email" });
  } else {
    if(!email.includes("@") || !email.includes(".")){
      errors.push({ error: "Please enter a valid email"})
    }
  }
  

  if (errors.length > 0) {
    errors.forEach((err) => console.log(`Error: ${err.error}`));
    res.json({
      errors,
      name,
      surname,
      email,
    });
  } else {
    try {
      const newUser = await User.create({
        name,
        surname,
        email,
      });
      res.status(200).send(newUser);
      // redirecting to users after post
      // res.redirect('/users');
    } catch (err) {
      console.error(err);
    }
  }
});

module.exports = router;
