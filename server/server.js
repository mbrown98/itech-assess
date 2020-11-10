const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = 8080;

app.get("/students", (req, res) => {
  console.log("Student request recieved");
  res.send("Students");
});

app.post("/students", (req, res) => {
  const { firstName, lastName } = req.body;
  console.log("firstName", firstName);
  console.log("lastName", lastName);
  res.send("Success");
});

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});
