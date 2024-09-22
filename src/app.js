const express = require("express");
const {authUser} = require("./Authorization/auth")

const app = express();
app.listen(7777, () => {
  console.log("Server is running on port 7777");
});

app.get("/user/login",(req,res)=>{
  res.send("Logged in succesfully")
})

app.use("/user",authUser,(req,res)=>{
  res.send("User data")
})

