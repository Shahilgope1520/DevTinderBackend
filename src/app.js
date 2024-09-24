const express = require("express");
const { authUser } = require("./middleware/auth");
const { connectDb } = require("./config/database");
const { User } = require("./model/user");

const app = express();

app.use(express.json())
app.get("/user",(req,res)=>{
  res.send("hello user")
})

app.post("/signup", async(req, res) => {
  console.log(req.body)
  const user = new User(req.body);
  try {
    await user.save();
    res.status(200).send("Created Successfully");
    console.log("Created Successfully")
  } catch (err) {
    res.status(400).send("Unauthorized" + err.message);
    console.log("Unauthorized")
  }
});
connectDb()
  .then(() => {
    app.listen(7777, () => {
      console.log("Server is running on port 7777");
    });
  })
  .catch((err) => console.error("Unable to connect to db"));
