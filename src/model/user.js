const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bycrypt = require("bcrypt");
const { Schema } = mongoose;
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      minLength: 4,
      maxLength: 15,
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      minLength: 4,
      maxLength: 15,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      index: true,
      unique: true,
      // validate: {
      //   validator: (v) => {
      //     return validator.isEmail(v);
      //   },
      //   message: (props) => `${props.value} is not a valid email address!`,
      // },
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error(`${value} is not a valid email address!`);
        }
      },
    },
    skills: {
      type: [String],
      default: [],
      validate: [
        {
          validator: function (value) {
            return Array.isArray(value);
          },
          message: "Skills should be an array.",
        },
        {
          validator: function (value) {
            return new Set(value).size === value.length;
          },
          message: "Skills should be unique.",
        },
        {
          validator: function (value) {
            return value.length <= 5;
          },
          message: "You can only have up to 5 skills.",
        }
      ]
    },
    profileImage: {
      type: String,
      default:
        "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
      trim: true,
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error(`${value} is not a valid url!`);
        }
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,   
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
      lowercase: true,
      validate: {
        validator: (value) => {
          return ["male", "female", "others"].includes(value);
        },
        message: (props) => `${props.value} is not a valid gender!`,
      },
    },
  },
  { strict: true, timestamps: true }
);
userSchema.methods.getJwtToken = function () {
  const user = this;
  const { _id } = user;
  const token = jwt.sign({ _id }, "DevTinder@1$52", { expiresIn: "7d" });
  return token;
};

userSchema.methods.isValidUser =  async function (password) {
  const passwordHash = this?.password;
  const isValidUser = await bycrypt.compare(password, passwordHash);
  console.log('isValidUser', isValidUser)
  return isValidUser;
};


const User = mongoose.model("user", userSchema);
module.exports = { User };
