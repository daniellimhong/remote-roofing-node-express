require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const compression = require('compression');
const app = express();
app.use(compression());

// Body parser
app.use(bodyParser.json());

// Database
const sequelize = require("./config/database");
sequelize
  .authenticate()
  .then(() => console.log("Database connection successful!"))
  .catch((err) => console.error("Error", err));

// Routes
app.use("/users", require("./routes/users"));
app.use("/projects", require("./routes/projects"));
app.use("/tasks", require("./routes/tasks"));

// const PORT = process.env.SERVER_PORT || 4000;

// Syncing models to DB & Server initiation
sequelize
  .sync()
  .then((res) => {
    // console.log(res)  
    // app.listen(PORT, console.log(`Server listening on port ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });



module.exports = app;