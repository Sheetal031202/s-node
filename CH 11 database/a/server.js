const express = require("express")
const app = express()
const mongoose = require("./config/db.config")
const aaModel = require("./model/name.model")
const PORT = 8000;

app.set("view engine", "ejs")
app.use(express.urlencoded())

app.get("/", (req, res) => {
    res.render("home", {
        name: "sheetal"
    })
})

app.post("/addpost", async (req, res) => {

    const addData = await aaModel.create(req.body)
    if (addData) { console.log("data added") }
    else {
        console.log("not added data")
    }

    res.redirect("/view")
})

app.get("/view", async(req, res) => {

    const allData= await aaModel.find()

    res.render("view",{
        allData
    })
})


app.get("/delete", async(req,res)=>{
    console.log("delete id:",    req.query.deleteId)
 
let deleted=await aaModel.findByIdAndDelete(req.query.deleteId)
if(deleted){console.log("data deleted")}
else{console.log("not deleted data")}
    res.redirect("/view")
})

app.get("/edit/:idd",async (req,res)=>{
const singleData=await afindById(req.query.idd)

    res.render("edit",{
        singleData
    })
})

app.listen(PORT, (er) => {
    if (er) { console.log("not server started.......") }
    console.log("yes...server staretd...")
})