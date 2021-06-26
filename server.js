const express = require("express");
const app = express();
const cors = require("cors");
require("./configs/mongoose");

const { createUser, getUsers } = require("./controllers/users");
const { createExercise } = require("./controllers/exercise");
const { getUserLogs } = require("./controllers/logs");

app.use(cors());
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

//Bodyparser for post and put requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/users", createUser);
app.get("/api/users", getUsers);
app.post("/api/users/:_id/exercises", createExercise);
app.get("/api/users/:_id/logs", getUserLogs);

//Error handler
app.use(function (err, req, res, next) {
  if (err) {
    err = errorRefactor(err);
    // console.log(err);
    res
      .status(err.status || 500)
      .type("txt")
      .send(err.message || "SERVER ERROR");
  }
});

function researchErrorMesage(err) {
  if (typeof err == "object") {
    for (const [key, value] of Object.entries(err)) {
      if (key == "message") return value;
      const subResearch = researchErrorMesage(value);
      if (subResearch) return subResearch;
    }
  }
  return null;
}

function errorRefactor(err) {
  const message = err.message;
  delete err.message;
  err.message = researchErrorMesage(err);
  if (!err.message) err.message = message;
  return err;
}

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
