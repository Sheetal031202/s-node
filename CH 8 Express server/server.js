const expressModule=require("express")
const app=expressModule()
const fsModue=require("fs")

app.get("/",(req,res)=>{
    fsModue.readFile("./home.html",(err,result)=>{
            res.end(result)

    })
})

app.get("/about",(req,res)=>{
    fsModue.readFile("./about.html",(err,result)=>{
            res.end(result)

    })
})
app.get("/contact",(req,res)=>{
    fsModue.readFile("./contact.html",(err,result)=>{
            res.end(result)

    })
})

app.listen(8080,(e)=>{
    if(e){
        console.log("not started")
    }
    console.log("starteg")
})