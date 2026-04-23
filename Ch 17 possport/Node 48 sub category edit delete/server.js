const express = require("express");
const path = require("path");
const app = express();

const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");

require("./middleware/passportjs.middleware");

// database connect
require("./config/db");

const PORT = 8000;

// body parser
app.use(express.urlencoded({ extended: true }));

// static folders
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// cookie parser
app.use(cookieParser());

// session
app.use(
  session({
    name: "AdminSession",
    secret: "AdminPanel@031202#dave",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

// passport
app.use(passport.initialize());
app.use(passport.session());

// view engine
app.set("view engine", "ejs");

// passport current admin middleware
app.use(passport.currentAdmin);

// routes
app.use("/", require("./routes/index"));

app.listen(PORT, (err) => {
  if (err) {
    console.log("server is not starting");
  }
  console.log("server started...");
});