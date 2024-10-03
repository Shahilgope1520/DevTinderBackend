const express = require("express");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("./model/user");
const validator = require("validator");
const { authUser } = require("./middleware/auth");
const { connectDb } = require("./config/database");
const { validateSignup } = require("./utils/validation");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!validator.isEmail(email)) {
      throw new Error("Invalid email addresss");
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isValidUser = user.isValidUser(password);
    if (isValidUser) {
      const { _id } = user;
      const token = await user.getJwtToken();
      res.cookie("token", token,{ expires: new Date(Date.now() + 90000)});
      res.send("Login Sucessfull");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(500).send("Something went wrong " + err.message);
  }
});

app.get("/profile", authUser, async (req, res) => {
  try {
    const user = res?.user;
    res.send(user);
  } catch (err) {
    res.status(500).send("Something went wrong " + err.message);
  }
});

app.post("/sendConnection", authUser, (req, res) => {
  console.log(res?.user)
  res.send(`connection sent by ${res?.user?.firstName}`)
});

app.delete("/user", async (req, res) => {
  const userId = req?.body?.id;
  try {
    const user = await User.findByIdAndDelete(userId);
    console.log("user", user);
    res.send("user deleted succesfully");
  } catch (err) {
    res.status(500).send("Something went wrong" + err.message);
  }
});
app.patch("/user/:id", async (req, res) => {
  console.log("params", req?.params?.id);
  try {
    const approvedFields = ["firstName", "lastName", "skills", "dp", "gender"];
    const userId = req?.params?.id;
    const data = req?.body;
    const invalidFields = Object.keys(data).filter(
      (key) => !approvedFields.includes(key)
    );

    if (invalidFields.length > 0) {
      return res
        .status(400)
        .send(`Cannot update fields: ${invalidFields.join(", ")}`);
    }

    // Check if 'skills' array exceeds allowed limit
    if (data.skills && data.skills.length > 5) {
      return res.status(400).send("Maximum 5 skills allowed");
    }
    const user = await User.findByIdAndUpdate(userId, data, {
      runValidators: true,
      new: true,
    });
    if (user) {
      res.send({
        message: "User updated successfully",
        updatedUser: user, // Send the updated user data
      });
    } else {
      res.status(404).send("user not found");
    }
  } catch (err) {
    res.status(500).send("Something went wrong " + err.message);
  }
});
app.patch("/updateUserByEmailId", async (req, res) => {
  const email = req?.body?.email;
  try {
    const user = await User.findOneAndUpdate({ email }, req?.body, {
      returnDocument: "before",
      runValidators: true,
    });
    if (user) {
      res.send(`email: ${user?.email} update succesfully`);
    } else {
      res.status(401).send("No user found");
    }
  } catch (err) {
    res.status(500).send("Something went wrong" + err.message);
  }
});
app.get("/userByField", async (req, res) => {
  try {
    const user = await User.findOne({ email: req?.body?.email });
    if (user) {
      res.send(user);
    } else {
      res.status(404).send("No user found");
    }
  } catch (err) {
    res.status(500).send("Something went wrong" + err.message);
  }
});
app.get("/userById", async (req, res) => {
  try {
    const userById = await User.findById(req.body.id, "firstName");
    res.send(userById);
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});
app.get("/feed", async (req, res) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (err) {
    res.status(500).send("Something went wrong" + err.message);
  }
});

app.post("/signup", async (req, res) => {
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
connectDb()
  .then(() => {
    app.listen(7777, () => {
      console.log("Server is running on port 7777");
    });
  })
  .catch((err) => console.error("Unable to connect to db"));
