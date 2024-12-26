const express = require("express");
const mongoose = require("mongoose");
const { userRoute } = require("./src/routes/User");

const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/user", userRoute);

app.listen(1604, async () => {
  await mongoose.connect("mongodb://localhost:27017/Login_sp");
  console.log("db connected");
});
