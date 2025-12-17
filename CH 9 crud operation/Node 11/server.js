const express = require("express")
const app = express()
const PORT = 8080

app.set("view engine", "ejs")
// 7 
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


app.get("/", (req, res) => {
    res.render("home", {
        name: "sheetal",
        users: allUsers
    })
})

// 3rd demo
// app.get("/adduser",(req,res)=>{
// res.send("hi i m add user")
// })

// // 4
// let thisid = 104;
// app.get("/adduser", (req, res) => {
//     // 4.1
//     let addData = req.query
//     addData.id = thisid;
//     thisid++;

//     // 4.2
//     console.log(addData)

//     // 4.3
//     allUsers.push(addData)

//     // 4.4
//     res.redirect("/")
// })

// 5 form ma get ni balde post

// 6 app.get ni badle post
let thisid = 104;
app.post("/adduser", (req, res) => {
    // 6.1 req,query ni badle body
    let addData = req.body
    addData.id = thisid;
    thisid++;

    // 6.2
    console.log(addData)

    // 6.3
    allUsers.push(addData)

    // 6.4 redirect("/") ni badle ("back") and aa badhu set karyu chhe te keva upar 7 toj body ma data aavse
    res.redirect("/")
})


app.listen(PORT, (er) => {
    if (er) {
        console.log("not started")
    }
    console.log(" started...............")

})
