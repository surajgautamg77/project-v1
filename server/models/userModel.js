const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const usersShema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "an user must have a name"],
    trim: true,
  },

  email: {
    type: String,
    required: [true, "user must have email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "please provide valid email"],
  },
  photo: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    // select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please cconfirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "password are naot same",
    },
  },
});

usersShema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
});

usersShema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = mongoose.model("User", usersShema);
