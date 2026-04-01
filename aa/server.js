const express = require("express")
const app = express()
const PORT = 8000
require("./config/db")
const path=require("path")
app.use(express.urlencoded())


app.set("view engine","ejs")
app.use("/",require("./routes/routes"))
app.use("/uploads",express.static(path.join(__dirname,"uploads")))


app.listen(PORT, (e) => {
    if (e) {
        console.log("server is not running....")
    }
    console.log("server is running....")
})