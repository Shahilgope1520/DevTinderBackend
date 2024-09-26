const express = require("express");
const { authUser } = require("./middleware/auth");
const { connectDb } = require("./config/database");
const { User } = require("./model/user");

const app = express();

app.use(express.json());

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
app.patch("/user", async (req, res) => {
  const userId = req?.body?.id;
  const data = req?.body;
  try {
    const user = await User.findByIdAndUpdate(userId, data, {runValidators:true});
    console.log("user", user);
    if (user) {
      res.send("user updated succesfully");
    } else {
      res.status(401).send("user not found");
    }
  } catch (err) {
    res.status(500).send("Something went wrong" + err.message);
  }
});
app.patch("/updateUserByEmailId", async (req, res) => {
  const email = req?.body?.email;
  try {
    const user = await User.findOneAndUpdate({ email }, req?.body, {
      returnDocument: "before",runValidators:true
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
  console.log(req.body);
  try {
    const user = new User(req.body);
    await user.save();
    res.status(200).send("Created Successfully");
    console.log("Created Successfully");
  } catch (err) {
    res.status(400).send("Unauthorized " + err.message);
    console.log("Unauthorized");
  }
});
connectDb()
  .then(() => {
    app.listen(7777, () => {
      console.log("Server is running on port 7777");
    });
  })
  .catch((err) => console.error("Unable to connect to db"));
