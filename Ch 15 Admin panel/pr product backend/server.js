const express = require("express")
const app=express()
const PORT=8000

// database
require("./config/db")


app.use(express.json())
app.use(express.urlencoded())

app.use("/",require("./routes/routes"))


// view
app.set("view engine","ejs")



app.listen(PORT,(e)=>{
if(e){
    console.log("server in not runnig")
}
console.log(`sever is running on port ${PORT}`)
})