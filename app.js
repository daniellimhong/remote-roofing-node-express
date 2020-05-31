const express = require("express");

const app = express();
require("dotenv").config();

// Database
const db = require("./config/database");
db.authenticate()
  .then(() => console.log("Database connection successful!"))
  .catch(err => console.error("Error", err));

// User routes
app.use('/users', require('./routes/users'));

const PORT = process.env.SERVER_PORT || 4000;

app.listen(PORT, console.log(`Server listening on port ${PORT}`));
