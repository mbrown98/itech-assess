require("./models/Student");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = 8080;

const Student = mongoose.model("Student");

mongoose.connect(
  "mongodb+srv://matt:brown@cluster0.mav4r.mongodb.net/<dbname>?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});
mongoose.connection.on("error", (err) => {
  console.error("Error connecting to mongo", err);
});

app.get("/students", async (req, res) => {
  const students = await Student.find({});

  res.send(students.reverse());
});

app.post("/addStudent", async (req, res) => {
  const { firstName, lastName } = req.body;
  try {
    const track = new Student({ firstName, lastName });
    await track.save();
    res.status(200).send(track);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

app.post("/deleteAll", async (req, res) => {
  try {
    await Student.deleteMany({});
    res.status(200).send("deleted");
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});
