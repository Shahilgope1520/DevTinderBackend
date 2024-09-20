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

// app.post("/user", (req, res) => {
//   res.send("Data Sent Succesfully");
// });
// app.delete("/user", (req, res) => {
//   res.send("Data Deleted Succesfully");
// });

app.listen(7777, () => {
  console.log("Server is running on port 7777");
});


// app.get("/a(bc)*c", (req, res) => {
//     res.send({
//       name: "Shahil",
//       role: "F.E.",
//     });
//   });
//   app.get(/a/,(req,res)=>{  // a in path and it will work
//       res.send("a")
//   })
//   app.get(/.*fly$/,(req,res)=>{  // fly at end in path and it will work
//       res.send("fly")
//   })
//   app.get("/user", (req, res) => {
//     res.send({
//       name: "Shahil",
//       role: "F.E.",
//     });
//   });


  app.get("/user/:id/:name", (req, res) => {
    console.log('dynamic params', req?.params)
    res.send({
      name: "Shahil",
      role: "F.E.",
    });
  });
  app.get("/user", (req, res) => {  //http://localhost:7777/user?id=200&name=shahil
    console.log('query params', req?.query)
    res.send({
      name: "Shahil",
      role: "F.E.",
    });
  });


