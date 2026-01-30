const express=require("express")
const app=express()
app.use(express.urlencoded())

const PORT=8000


app.set("view engine","ejs")

// database
require("./config/db.json")
// index file ...main routes
app.use("/",require("./routes/index"))





app.listen(PORT,(e)=>{
if(e){console.log("sevrer not connected....")}

console.log("server start......")
})