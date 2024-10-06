const express = require("express");
const validator =require("validator")
const bcrypt =require("bcrypt")
const { User } = require("../model/user");
const {validateSignup} =require("../utils/validation")

const authRouter = express.Router();

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!validator.isEmail(email)) {
      throw new Error("Invalid email addresss");
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isValidUser = await user.isValidUser(password);
    if (isValidUser) {
      const token = await user.getJwtToken();
      res.cookie("token", token, { expires: new Date(Date.now() + 90000) });
      res.send("Login Sucessfull");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(500).send("Something went wrong " + err.message);
  }
});

authRouter.post("/signup", async (req, res) => {
  try {
    validateSignup(req);
    const { password, email, lastName, firstName, gender } = req?.body;
    const passwordHash = await bcrypt.hash(password, 10); // 10 salt rounds
    const user = new User({
      password: passwordHash,
      email,
      lastName,
      firstName,
      gender,
    });
    await user.save();
    res.status(200).send("Created Successfully");
  } catch (err) {
    res.status(400).send("Unauthorized " + err.message);
  }
});

module.exports = authRouter;
