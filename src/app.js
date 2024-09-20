const express = require("express");

const app = express();

// app.use("/", (req, res,next) => { // order is important
//   res.send("hello bhai");
// });
// app.use("/test/2", (req, res, next) => {
//   res.send("testing 2");
// });
// app.use("/test", (req, res) => {   // whatever exact string string it first take it will follow
//   res.send("testing");
// });
// app.use("/test/3", (req, res) => {
//   res.send("testing 3");
// });

// app.use("/",(req,res)=>{
//     res.send("HAHAHAHA")
// })

app.post("/user", (req, res) => {
  res.send("Data Sent Succesfully");
});
app.delete("/user", (req, res) => {
  res.send("Data Deleted Succesfully");
});

app.listen(7777, () => {
  console.log("Server is running on port 7777");
});

