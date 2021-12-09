const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const app = express();
const User = require("./user");
console.clear();
//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("secret"));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);
//-----------------------------------------End Of MiddleWares------------------------------------//
//Database connect
mongoose.connect(
  "mongodb://localhost:27017/passportPractice",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log("Failed to connect database " + err);
    } else {
      console.log("Database connected successfully......");
    }
  }
);
//-----------------------------------------End Of Database------------------------------------//
//Routes
app.get("/user", (req, res) => {
  if (req.isAuthenticated()) {
    console.log(req.user);
    res.send(req.user.username);
  } else {
    res.send("Please Login First......");
  }
});

app.post("/register", (req, res) => {
  User.findOne({ username: req.body.username }, async (err, data) => {
    if (err) {
      throw err;
    }
    if (data) {
      return res.send("User already exists...");
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = new User({
        username: req.body.username,
        password: hashedPassword,
      });
      await user.save();
      res.send("User Created Successfully....");
    }
  });
});

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No User Exists...");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("User Authenticated Successfully....");
        console.log(req.user);
      });
    }
  })(req, res, next);
});

app.get("/logout", (req, res) => {
  try {
    req.logOut();
    res.send("Logged Out Successfully.....");
  } catch (err) {
    console.log(err);
    res.send("Something went wrong.....");
  }
});
//-----------------------------------------End Of Routes------------------------------------//
app.listen("5000", () => {
  console.log("server is running on port 5000.....");
});
