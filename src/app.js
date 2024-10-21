const express = require("express");
const cookieParser = require("cookie-parser");
const { User } = require("./model/user");
const {ConnectionRequest} =require("./model/connectionRequest")
const authRouter =require("./router/authRouter")
const profileRouter = require("./router/profileRouter");
const connectionRouter = require("./router/connectionRouter")
const { authUser } = require("./middleware/auth");
const { connectDb } = require("./config/database");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/",authRouter)
app.use("/",profileRouter)
app.use("/",connectionRouter)



connectDb()
  .then(() => {
    app.listen(7777, () => {
      console.log("Server is running on port 7777");
    });
  })
  .catch((err) => console.error("Unable to connect to db"));
