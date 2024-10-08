const express = require("express");
const { User } = require("../model/user");
const { authUser } = require("../middleware/auth");
const { ValidateEditProfileData } = require("../utils/validation");
const validator = require("validator");
const bcrypt = require("bcrypt");

const profileRouter = express.Router();

profileRouter.get("/profile/view", authUser, async (req, res) => {
  try {
    const user = req?.user;
    console.log("user", user);
    res.send(user);
  } catch (err) {
    res.status(500).send("Something went wrong " + err.message);
  }
});

profileRouter.patch("/profile/edit", authUser, async (req, res) => {
  try {
    if (!ValidateEditProfileData(req.body)) {
      return res.status(401).send("Update Unauthorized");
    }
    const userId = req?.user?._id;
    const userDataToUpdate = req?.body;
    const updatedUser = await User.findByIdAndUpdate(userId, userDataToUpdate, {
      new: true,
      runValidators: true,
    });
    res.send({ message: "user updated succesfully", data: updatedUser });
  } catch (error) {
    res.status(500).send("Something went wrong in update " + error);
  }
});

profileRouter.patch("/profile/update-password", authUser, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = req?.user;

    if (!newPassword) {
      return res.status(400).json({ error: "New password is required" });
    }

    // Verify if current password is correct
    const isValid = await user.isValidUser(currentPassword);
    if (!isValid) {
      return res.status(400).json({ error: "Current password is incorrect" });
    }

    // Validate if the new password is strong
    if (!validator.isStrongPassword(newPassword)) {
      return res.status(400).json({ error: "New password must be strong" });
    }

    // Hash new password and update user
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return res.json({ message: "Password updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Something went wrong: " + error.message });
  }
});

profileRouter.delete("/profile/delete", authUser, async (req, res) => {
  const userId = req?.user?._id;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("user deleted succesfully");
  } catch (err) {
    res.status(500).send("Something went wrong" + err.message);
  }
});

module.exports = profileRouter;
