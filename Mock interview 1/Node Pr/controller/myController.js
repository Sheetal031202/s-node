const myModel = require("../model/model")
const { all } = require("../routes/route")
const fs = require("fs")
// jhome
const homepageShowFun = async (req, res) => {
    try {
        const allData = await myModel.find()

        // console.log("All data",allData)
        res.render("homePage", { allData })
    }
    catch {
        console.log("home page in not show")
        res.render("homePage")
    }
}

// add page show
const addpageShowFun = (req, res) => {
    try {
        res.render("addPage")
    }
    catch {
        console.log("home page in not show")
        res.redirect("/")
    }
}

// addd logic
const addDataLogic = async (req, res) => {
    try {
        // console.log("Data :", req.body)

        console.log("file", req.file)
        req.body.image = req.file.path
        const added = await myModel.create(req.body)
        // console.log("Added",added)
        res.redirect("/add")
    }
    catch (e) {
        console.log("data not added....", e)
        res.redirect("/")
    }
}

// edit page open
const editpageShowFun = async (req, res) => {
    try {
        const data = await myModel.findById(req.params.id)
        console.log("singke data", data)
        res.render("editPage", { data })
    }
    catch {
        console.log("edit page in not show")
        res.redirect("/")
    }
}
// edit logic
const editDataLogic = async (req, res) => {
    if (req.file) {

        req.body.image = req.file.path
        let old = await myModel.findById(req.params.id)
        let neww = await myModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (neww) {
            if (old.image) {
                fs.unlink(old.image, () => { })
            }
        }
    }
    else {
        let neww = await myModel.findByIdAndUpdate(req.params.id, req.body, { new: true })

    }
    res.redirect("/")
}

const deleteFun=async(req,res)=>{
    
    const deleted=await myModel.findByIdAndDelete(req.params.id)
    fs.unlink(deleted.image,()=>{})
    res.redirect("/")
}

module.exports = {
    homepageShowFun,
    addpageShowFun, addDataLogic,
    editpageShowFun, editDataLogic,
    deleteFun
}