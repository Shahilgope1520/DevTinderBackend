const mongoose = require("mongoose");
const validator = require('validator');
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
      validate(value){
        if(!validator.isEmail(value)){
          throw new Error(`${value} is not a valid email address!`);
          
        }
      }
    },
    skills: {
      type: [String],
      default: [],
      validate: {
        validator: (value) => {
          return Array.isArray(value) && new Set(value).size === value?.length;
        },
        message: "Skills should be unique",
      },
    },
    dp: {
      type: String,
      default:
        "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
      trim: true,
      validate(value){
        if(!validator.isURL(value)){
          throw new Error(`${value} is not a valid url!`);
          
        }
      }
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

const User = mongoose.model("user", userSchema);
module.exports = { User };
