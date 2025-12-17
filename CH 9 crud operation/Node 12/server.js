const { name } = require("ejs")
const express=require("express")
const app=express()
const PORT=8000

// 1 ejs mate
 app.set("view engine","ejs")
//  3 post mate
 app.use(express.urlencoded())

let allUsers = [{
    id: 101,
    name: "sheetal",
    email: "s@gmai.com",
    password: "456",
    phone: 1474561231,
    adress: "surat"
},
{
    id: 102,
    name: "raj",
    email: "r@gmai.com",
    password: "123",
    phone: 7414561231,
    adress: "surattttt"
},
{
    id: 103,
    name: "smaeer",
    email: "sam@gmai.com",
    password: "789",
    phone: 989894561231,
    adress: "surat"
}]


// 1 home 
app.get("/",(req,res)=>{
  return   res.render("home",{
    name:"sheetal"
  })
})

//2  view data
app.get("/viewdata",(req,res)=>{
    res.render("view",{
        name:"sheetal",
        users:allUsers
    })
})

// 3 add data
let id=104;
app.post("/addpost",(req,res)=>{
    req.body.id=id;
    id++;

    const a=req.body
    // console.log(a)

    allUsers.push(a)
    res.redirect("/viewdata")
})



// 4 delete
app.get("/deletedata",(req,res)=>{
    let deleteid=req.query.idd
    // console.log("DELEETE ni id ",deleteid)

allUsers=allUsers.filter((e)=>e.id!=deleteid)
console.log(allUsers)
    res.redirect("/viewdata")
})







app.listen(PORT,(err)=>{
    if(err){
        console.log("er......")
        return false
    }
    console.log("stated...........")
})