const express = require("express")
const app = express()
// database require
require("./config/db.json")
// model requirea
const stuModel = require("./model/studentModel")
const PORT = 8000


app.set("view engine", "ejs")
app.use(express.urlencoded())

// home page show
app.get("/", (req, res) => {
    return res.render("addData", {
        name: "sheetal"
    })
})

// add 
app.post("/addData", async (req, res) => {

    const addData = await stuModel.create(req.body)
    // console.log("Add Data",addData)

    if (addData) { console.log("New Data Added") }
    else { console.log("New data not added") }

    return res.redirect("/")
})

// view 
app.get("/view", async (req, res) => {

    const allData = await stuModel.find()
    // console.log("All Data", allData)

    res.render("viewData", {
        name: "sheetal",
        allData
    })
})

// delete
app.get("/deteteData", async (req, res) => {
    console.log("Delete ID", req.query.deleteDataId)

    const deleted = await stuModel.findByIdAndDelete(req.query.deleteDataId)

    
    if (deleted) { console.log(" Data deleted") }
    else { console.log(" data not deleted") }

    res.redirect("/view")
})

// edit Data  page
app.get("/editData/:editIdd", async (req, res) => {
    // console.log(req.params)

    const updated = await stuModel.findById(req.params.editIdd)
    // console.log(updated)
    res.render("editPage", {
        name: "sheetal",
        updated
    })
})

// edit logic
app.post("/updatedData", async (req, res) => {
    console.log(req.body)
    const updated = await stuModel.findByIdAndUpdate(req.body.id,req.body,{new:true})

    
    if (updated) { console.log(" Data updated") }
    else { console.log(" data not updated") }


    res.redirect("/view")
})
app.listen(PORT, (e) => {

    if (e) {
        console.log("server not connected ")

    }
    console.log(" server connected ")

})