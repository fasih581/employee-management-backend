const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/usermodel");
const path = require("path");

// @desc signup
// @rout post /signup
exports.create = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const useravailable = await User.findOne({ email });
  if (useravailable) {
    res.status(400);
    throw new Error("User already registered!");
  }

  //   hash password
  const hashedpassword = await bcrypt.hash(password, 10);
  console.log("Hashedpassword: ", hashedpassword);
  const user = User.create({
    username,
    email,
    password: hashedpassword,
  });
  console.log(`User created ${user}`);
  res.redirect("/api/login");
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is not valid!");
  }
  res.json({ message: "signup user" });
});

// @desc login
// @rout post /login
exports.checkEmp = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body);
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const user = await User.findOne({ email });
  //   compare password with hashed password
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECERT,
      { expiresIn: "1m" }
    );
    res.redirect("/");
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("email and password is not valid!");
  }
});

// @desc current user
// @rout GET /user/current
exports.currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

// @desc logout
// @rout GET /logout
exports.logout = asyncHandler(async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
    }
    res.redirect("/api/login");
  });
});
