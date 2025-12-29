const { name } = require("ejs")
const express = require("express")
const app = express()
const PORT = 8000

app.set("view engine", "ejs")
app.use(express.urlencoded())


let allUsers = [
    {
        id: 101,
        name: "sheetal",
        std: 10
    },
    {
        id: 102,

        name: "sameer",
        std: 11
    },
    {
        id: 103,

        name: "kana",
        std: 3
    },
    {
        id: 104,

        name: "raghu",
        std: 3
    }
]

app.get("/", (req, res) => {
    res.render("home", {
        name: "sheetal",
    })
})


let idd = 105;
app.post("/addpost", (req, res) => {
    req.body.id = idd;
    idd++;
    // console.log(req.body)

    allUsers.push(req.body)
    res.redirect("view")
})

app.get("/view", (req, res) => {
    res.render("view", {
        name: "sheetal",
        allUsers
    })
})

app.get("/delete", (req, res) => {

    console.log("DElete id", req.query.iid)
    allUsers = allUsers.filter((e) => e.id != req.query.iid
    )
    res.redirect("view")
})


// edit
app.get("/edit", (req, res) => {
    let data = allUsers.find((e) => e.id == req.query.iid)
    res.render("about",
        {
            name: "sheetal",
            data
        }
    )
})

app.post("/editpost",(req,res)=>{
   allUsers= allUsers.map((e)=>{
        if(e.id==req.body.id){
            return req.body
        }
        else{
            return e
        }
    })

    res.redirect("/view")
})


app.listen(PORT, (er) => {
    if (er) {
        console.log("no........server not started")
    }

    console.log("yes....server  started")

})
