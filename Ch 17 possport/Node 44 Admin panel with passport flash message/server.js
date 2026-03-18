const express = require("express")
const path = require("path")
const app = express()

const cookiePaeser = require("cookie-parser")
const session = require("express-session")
const passport = require("passport")

require("./middleware/passportjs.middleware")

// require database
require("./config/db")

const PORT = 8000


app.use(cookiePaeser())
app.use(session({
    name: "AdminSession",
    secret: "AdminPanel@031202#dave",
    resave: true,
    saveUninitialized: false,
    cookie: {
maxAge:1000*60*60*24 
    }
}))


app.use(passport.initialize())
app.use(passport.session())

// view engine
app.set("view engine", "ejs")
app.use(express.urlencoded())

// public folder mate
app.use(express.static(path.join(__dirname, "public")))
app.use("/uploads", express.static(path.join(__dirname, "uploads")))


// 5.3 routes pela
app.use(passport.currentAdmin)



// route main file
app.use("/", require("./routes/index"))


app.listen(PORT, (e) => {
    if (e) { console.log("server is not starting") }
    console.log("server started..")
})