const express = require("express")
const {authUser} =require("../middleware/auth")
const connectionRouter = express.Router()


connectionRouter.post("/sendConnection", authUser, (req, res) => {
    console.log(res?.user)
    res.send(`connection sent by ${res?.user?.firstName}`)
  });

module.exports = connectionRouter