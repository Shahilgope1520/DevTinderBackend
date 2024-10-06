const express = require("express");
const { User } = require("../model/user");
const { authUser } = require("../middleware/auth");

const profileRouter = express.Router();

profileRouter.get("/user/profile", authUser, async (req, res) => {
  try {
    const user = res?.user;
    res.send(user);
  } catch (err) {
    res.status(500).send("Something went wrong " + err.message);
  }
});

profileRouter.delete("/user", async (req, res) => {
  const userId = req?.body?.id;
  try {
    const user = await User.findByIdAndDelete(userId);
    console.log("user", user);
    res.send("user deleted succesfully");
  } catch (err) {
    res.status(500).send("Something went wrong" + err.message);
  }
});
profileRouter.patch("/user/:id", async (req, res) => {
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
profileRouter.patch("/updateUserByEmailId", async (req, res) => {
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
profileRouter.get("/userByField", async (req, res) => {
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
profileRouter.get("/userById", async (req, res) => {
  try {
    const userById = await User.findById(req.body.id, "firstName");
    res.send(userById);
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});
profileRouter.get("/feed", async (req, res) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (err) {
    res.status(500).send("Something went wrong" + err.message);
  }
});

module.exports =profileRouter
