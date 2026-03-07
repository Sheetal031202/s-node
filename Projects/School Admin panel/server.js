const express =require("express")
const app=express()
const PORT=8000
const path=require("path")
const cookieParser=require("cookie-parser")
app.use(cookieParser());


// database connected
require("./config/db.json")
// view engine
app.set("view engine","ejs")
app.use(express.urlencoded())

// public mate so that we can get html css
app.use(express.static(path.join(__dirname,"public")))
app.use("/uploads",express.static(path.join(__dirname,"uploads")))


// route
app.use("/",require("./routes/adminRoute"))


app.listen(PORT,(e)=>{
if(e){console.log("Server in not connected")}
console.log(`server is working on port ${PORT}`)
})