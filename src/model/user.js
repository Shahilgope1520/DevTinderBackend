const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
  },
  lastName: String,
  email: String,
  password: String,
  gender: String,
},{strict:true});

const User = mongoose.model("user", userSchema);
module.exports = {User};
