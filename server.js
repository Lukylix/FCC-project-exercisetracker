const express = require("express");
const app = express();
const cors = require("cors");
const { get } = require("mongoose");
require("dotenv").config();

app.use(cors());
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

//Bodyparser for post and put requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/users", (req, res) => {});
app.get("/api/users", (req, res) => {});
app.post("/api/users/:id/exercises", (req, res) => {});
app.get("/api/users/:_id/logs", (req, res) => {});


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
