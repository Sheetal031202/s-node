const express = require("express")
const path = require("path")

const app = express()
const PORT = 8000
const cookieParser=require("cookie-parser")

require("./config/database")

// body parser
app.use(express.urlencoded({ extended: true }))

// static folder
app.use(express.static(path.join(__dirname,"public")))
app.use("/uploads",express.static(path.join(__dirname,"uploads")))

// cookie
app.use(cookieParser())

// routes
app.use(require("./routes/myRoutes"))

app.set("view engine","ejs")

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})