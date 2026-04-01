const model = require("../model/model")
const { all } = require("../routes/routes")
const fs = require('fs')

const homePageShow = (req, res) => {
    res.render("home")
}

const addPageShow = (req, res) => {
    res.render("add")
}

const addDataFun = async (req, res) => {
    const added = await model.create(req.body)
    if (added) {
        console.log("data added..")
        res.redirect("/add")
    }
    else {
        console.log("data anot added...")
    }

}

const viewPageShow = async (req, res) => {
    const allData = await model.find()
    console.log("add", allData)
    res.render("view", { allData })
}

const deleteFun = async (req, res) => {

    const deleted = await model.findByIdAndDelete(req.params.id)
    if (deleted) {
        console.log("deleted...")
        res.redirect("/view")
    }
    else {
        console.log("data not deleted..")
    }
}
const editPageShow = async (req, res) => {
    const d = await model.findById(req.params.id)
    res.render("edit", { d })
}


const updateFun = async (req, res) => {

  

            let updated = await model.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
        

            if (updated) {
                console.log("updated  image");
                res.redirect("/view");
            }
        

}
module.exports = {
    homePageShow,
    addPageShow, addDataFun,
    viewPageShow,
    deleteFun, editPageShow, updateFun
}