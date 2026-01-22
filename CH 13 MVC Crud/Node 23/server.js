const express = require("express")
const app = express()
const PORT = 8000
//1
app.set("view engine", "ejs")
//2 route
app.use("/", require("./routes/index"))


app.listen(PORT, (e) => { 
    if (e) { console.log("Server not connected") }
    console.log("server connected...")
})