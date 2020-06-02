const express = require("express");
const router = express.Router();
const db = require("../config/database");
const User = require("../models/User");

//Get users
router.get("/", async (req, res) => {
  try {
    let userResponse = await User.findAll();
    res.status(200).send(userResponse);
  } catch (err) {
    console.error(err);
  }
});

// Add user ES7/8
router.post("/addUser", async (req, res) => {
  const { name, surname, email } = req.body;

  // console.log(name, surname, email);

  let errors = [];

  // Form validation
  if (!name) {
    errors.push({ text: "Please add a name" });
  }
  if (!surname) {
    errors.push({ text: "Please add a surname" });
  }
  if (!email) {
    errors.push({ text: "Please add a email" });
  }

  if (errors.length > 0) {
    errors.forEach((err) => console.log(`Error: ${err.text}`));
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

// Add user
// router.post("/addUser", (req, res) => {
//   let { name, surname, email } = req.body;

//   console.log(name, surname, email);

//   let errors = [];

//   // Form validation
//   if (!name) {
//     errors.push({ text: "Please add a name" });
//   }
//   if (!surname) {
//     errors.push({ text: "Please add a surname" });
//   }
//   if (!email) {
//     errors.push({ text: "Please add a email" });
//   }

//   //Checking errors
//   if (errors.length > 0) {
//     errors.forEach((err) => console.log(`Error: ${err.text}`));
//     res.json({
//       errors,
//       name,
//       surname,
//       email,
//     });
//   } else {
//     //insert into table
//     User.create({
//       name,
//       surname,
//       email,
//     })
//       .then((user) => {
//         console.log(user);
//         res.status(200).send(user);
//         res.redirect("/users");
//       })
//       .catch((err) => console.log(err));
//   }
// });

module.exports = router;
