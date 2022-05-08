const { promisify } = require("util");
const jwt = require("jsonwebtoken");

const User = require("./../models/userModel");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXP_IN,
  });
};

exports.signup = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    // jwt
    const token = signToken(newUser._id);

    res.status(201).json({
      status: "success",
      token,
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      status: "fail",
      data: error,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check if email and password is correct

    if (!email || !password) {
      res.send({
        message: "no email or no password",
      });
      return;
    }

    // check if user exists and password is correct
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      res.send("In correct email or password");
      return;
    }
    const token = signToken(user._id);
    res.status(200).json({
      status: "success",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      status: "fail",
      data: error,
    });
  }
};

exports.protect = async (req, res, next) => {
  try {
    // 1) Getting token and check of it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.send("You are not logged in! Please log in to get access.");
    }

    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.send("The user belonging to this token does no longer exist.");
    }

    req.user = currentUser;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      status: "fail",
      data: error,
    });
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.send("you are not autharized to perform this action");
    }
    next();
  };
};

exports.getAllUsers = async (req, res) => {
  try {
    const data = await User.find();
    res.status(200).json({
      status: "success",
      results: data.length,
      data: {
        data,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      data: error,
    });
  }
};
