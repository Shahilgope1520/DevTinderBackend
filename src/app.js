const express = require("express");

const app = express();
app.listen(7777, () => {
  console.log("Server is running on port 7777");
});

app.get("/getUserData",(req,res)=>{
  throw new Error("hello")
})
app.use("/",(err,req,res,next)=>{
  if(err){
    console.error('err', err.message)
    res.status(500).send(err.message)
  }
})


