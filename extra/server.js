
const { name } = require("ejs")
const express = require("express")
const app = express()

const PORT = 8000
app.set("view engine", "ejs")
app.use(express.urlencoded())

let allUsers = [{
    id: 101,
    name: "sheetal",
    std: 12,
    div: "a"
},
{
    id: 102,
    name: "sameer",
    std: 10,
    div: "b"
}, {
    id: 103,
    name: "kana",
    std: 1,
    div: "c"
}, {
    id: 104,
    name: "raghu",
    std: 2,
    div: "d"
},]

// home
app.get("/", (req, res) => {
    res.render("home", {
        name: "sheetal"
    })
})

// view

app.get("/view", (req, res) => {
    res.render("view", {
        name: "sheetal",
    allUsers
    })
           console.log(allUsers)

})

// post
let idd=105;
app.post("/addpost",(req,res)=>{
    req.body.id=idd;
    idd++; 

    allUsers.push(req.body)



    res.redirect("/view")
})

// delete
app.get("/delete",(req,res)=>{
    let deleteId=req.query.idd
    // console.log(deleteId)
    
    allUsers=allUsers.filter((e)=>e.id!=deleteId)


    res.redirect("/view")
})


// edit 
app.get("/editpage",(req,res)=>{
let editId=req.query.idd
// console.log(editId)


 let editData=allUsers.find((e)=>e.id==editId)
//  console.log(editData)

    res.render("edit",{
        name:"sheetal",
        editData
    })
})


app.post("/editpost", (req, res) => {
    const editidd = req.body.id
console.log("iiiiiiiiiiiid",req.body.id)

    allUsers = allUsers.map((e) => {
        if (e.id == editidd) {
            return req.body
        }
        else {
            return e
        }
    })


    res.redirect("/view")
})


app.listen(PORT, (er) => {
    if (er) {
        console.log("not start aerro", er)
    }
    console.log("stared.........")
})