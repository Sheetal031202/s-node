const express = require("express")
const app = express()
const PORT = 8000


app.set("view engine", "ejs")
app.use(express.urlencoded())

let allStudents = [{
    id: "101",
    name: "sheetal",
    std: "8",
    div: "a"
},
{
    id: "102",
    name: "sameer",
    std: "10",
    div: "a"
},
{
    id: "103",
    name: "raghu",
    std: "1",
    div: "a"
},
{
    id: "104",
    name: "kana",
    std: "1",
    div: "a"
}]


// home
app.get("/", (req, res) => {
    res.render("home")
})

// add Post
let idd = 105
app.post("/addpost", (req, res) => {
    req.body.id = idd;
    idd++;
    // console.log(req.body.id)

    allStudents.push(req.body)
    // console.log(req.body)

    res.redirect("/view")
})


// view
app.get("/view", (req, res) => {
    res.render("view", {
        allStudents
    })
})

// delete
app.get("/delete/",(req,res)=>{

    // console.log(req.query.deleteId,"Delete id ")
   allStudents= allStudents.filter((e)=>e.id!=req.query.deleteId)
    console.log(allStudents)


    res.redirect("/view")
})



// edit
app.get("/edit",(req,res)=>{

let data=allStudents.find((e)=>e.id==req.query.editId)

// console.log(data)
    res.render("edit",{
        data
    })
})


// edit post
app.post("/editpost",(req,res)=>{
  allStudents=  allStudents.map((e)=>{
        if(e.id==req.body.editId){
            return {...e,...req.body}
        }
        else{
            return e;
        }
    })

    console.log(req.body)
    res.redirect("/view")
})






app.listen(PORT, (er) => {

    if (er) {
        console.log("Server is not working")
    }
    console.log(`server is working on port ${PORT}`)
})