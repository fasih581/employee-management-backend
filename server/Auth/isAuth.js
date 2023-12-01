const asyncHandler = require("express-async-handler");
const session = require("express-session");

exports.sessionMid = session({
  secret: "12345",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30000,
  },
});

exports.isAuth = asyncHandler(async (req, res, next) => {
  if (req.session.isAuth) {
    return next();
  } else {
    return res.redirect("/api/login");
  }
});

