const express=require("express")
const app=express()
const dotenv=require("dotenv")
dotenv.config()
const PORT=process.env.PORT 

require("./config/db")

app.use(express.urlencoded())
app.use(express.json())

app.use("/api",require("./routes/index"))

app.listen(PORT,(e)=>{
if(e){console.log("server is not running....")}
console.log(`server is running on port ${PORT}`)
})