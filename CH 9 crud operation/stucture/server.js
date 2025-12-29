const express=require("express")
const app=express()
const PORT=8000

app.set("view engine","ejs")

app.get("/",(req,res)=>{
    res.render("home",{
        name:"sheetal"
    })
})



app.listen(PORT,(er)=>{
    if(er){
        console.log("no........server not started")
    }

            console.log("yes....server  started")

})
