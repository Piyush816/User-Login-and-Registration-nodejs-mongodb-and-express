const mongoose = require("mongoose");
const { default: validator } = require("validator");

const registerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique:true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email Id");
      }
    },
  },
  phone: {
    type: Number,
    min: 10,
    required: true,
    unique:true

  },
  password: {
    type: String,
    required: true,
  }
});


const Register = new mongoose.model("User",registerSchema);

module.exports = Register;