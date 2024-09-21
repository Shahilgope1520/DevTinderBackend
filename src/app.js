const express = require("express");
const { adminAuth, authUser } = require("./Authorization/auth");

const app = express();
app.listen(7777, () => {
  console.log("Server is running on port 7777");
});

app.use("/admin", adminAuth);

app.get("/admin/getAllData", (req, res) => {
  res.send("sent all data of admin");
});

app.post("/admin/deleteUser", (req, res) => {
  res.send("Deleted User Succesfully");
});

app.get("/user", authUser, (req, res) => {
  res.send("Get User Data");
});
