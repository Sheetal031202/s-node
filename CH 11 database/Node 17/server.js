const express = require("express")
require("./config/db.config")
const app = express()

app.set("view engine", "ejs")


app.get("/", (req, res) => {
    res.render("home")
})

app.listen(8000, (e) => {
    if (e) { console.log("erro", e) }
    console.log("statred..............")
})