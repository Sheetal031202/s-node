const stuModel = require("../model/stuModel")
const { all } = require("../routes")

// all stu view page show
const stuViewPageShow = async (req, res) => {

    const allData = await stuModel.find()
    // console.log("All Data",allData)
    res.render("stuViewPage", { allData })
}

// add form page show
const stuAddFormPageShow = (req, res) => {
    res.render("stuAddFormPage",)
}

// add student logic
const addStuDataFun = async (req, res) => {
    // console.log(req.body)

    const added = await stuModel.create(req.body)
    if (added) { console.log("Data Added") }
    else { console.log("Data not Adeed") }

    res.redirect("/stu/addStuPage")
}

// delete
const stuDeleteFun = async (req, res) => {
    // console.log("Delete id",req.query.deleteId)

    const deleted = await stuModel.findByIdAndDelete(req.query.deleteId)
    if (deleted) { console.log("Data deleted") }
    else { console.log("Data not deleted") }

    res.redirect("/stu")
}


// open edit page
const stuEditPageShow = (req, res) => {
    console.log("Edit Id", req.params.idd)

    res.render("editPage")
}



module.exports = { stuViewPageShow, stuAddFormPageShow, addStuDataFun, stuDeleteFun }