const express = require("express")
const app = express()
// database require
require("./config/db.json")
// model requirea
const stuModel = require("./model/studentModel")
// multer require
const multer = require("multer")
// path require
const path = require("path")
// fs require
const fs = require("fs")

const PORT = 8000


const myStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const uploadd = multer({ storage: myStorage })


app.set("view engine", "ejs")
app.use(express.urlencoded())
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// home page show
app.get("/", (req, res) => {
    return res.render("addData", {
        name: "sheetal"
    })
})

// add 
app.post("/addData", uploadd.single("stuImg"), async (req, res) => {

    // console.log(req.file)

    req.body.stuImg = req.file.path

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
    // console.log(deleted)

    fs.unlink(deleted.stuImg, () => (err) => { console.log("new image not updated") })

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
app.post("/updatedData", uploadd.single("stuImg"), async (req, res) => {
    // console.log(req.body)
    console.log(req.file)

    if (req.file) {
        const updateImg = await stuModel.findById(req.body.id)
        fs.unlink(updateImg.stuImg, (err) => { console.log("new image not updated") })
        req.body.stuImg = req.file.path

         const updated = await stuModel.findByIdAndUpdate(req.body.id, req.body, { new: true })
        if (updated) { console.log(" Data updated") }
        else { console.log(" data not updated") }



    }
    else {
        const updated = await stuModel.findByIdAndUpdate(req.body.id, req.body, { new: true })
        if (updated) { console.log(" Data updated") }
        else { console.log(" data not updated") }

    }

    res.redirect("/view")
})
app.listen(PORT, (e) => {

    if (e) {
        console.log("server not connected ")

    }
    console.log(" server connected ")

})