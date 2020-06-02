require("dotenv").config();
const app = require('./app');

const port = process.env.PORT;
if (port == null || port == "") port = 8000;

app.listen(port, console.log(`Server listening on port ${port}`));