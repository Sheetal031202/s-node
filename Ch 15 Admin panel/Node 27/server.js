const express=require("express")
const path =require("path")
const app=express()

const PORT=8000


// view engine
app.set("view engine","ejs")
// public folder mate
app.use(express.static(path.join(__dirname,"public")))

// route main file
app.use("/",require("./routes/index"))

app.listen(PORT,(e)=>{
    if(e){console.log("server is not starting")}
    console.log("server started..")
})