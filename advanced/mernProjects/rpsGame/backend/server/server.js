const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());

// app.use("url", point to routes file in route dir)

app.get("/", function homePage(req, res) {
  res.status(200).json({ message: "Hello World" });
});

app.listen(process.env.PORT, function startServer(req, res) {
  console.log(`listening on port ${process.env.PORT}`);
});
