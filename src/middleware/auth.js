const { User } = require("../model/user");
const jwt = require("jsonwebtoken");

const adminAuth = (req, res, next) => {
  const token = "xyz";
  const validAdminToken = token === "xyz";
  if (!validAdminToken) {
    res.status(401).send("Unauthorized Request");
  } else {
    next();
  }
};
const authUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Invalid token");
    }
    const decodeMessage = jwt.verify(token, "DevTinder@1$52");
    const { _id } = decodeMessage;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found, Login again");
    }
    res.user = user;
    next();
  } catch (err) {
    res.status(500).send("Something went wrong " + err.message);
  }
};

module.exports = {
  adminAuth,
  authUser,
};
