const express=require("express")
const app=express()
const PORT=8000;
const path=require("path")

app.use(express.urlencoded())


// route
app.use(require("./routes/route"))

app.set("view engine","ejs")
app.use("/uploads",express.static(path.join(__dirname,"uploads")))


// database
require("./config/database")

app.listen(PORT,(e)=>{
if(e){
    console.log("Server is not runninng.....")
}
console.log(`server is running on port ${PORT}`)
})