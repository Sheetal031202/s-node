const empModel = require("../model/empModel")

// show "/employee" page
const empFormPage = (req, res) => {
    res.render("empForm")
}

// add Data
const addEmployee = async (req, res) => {

    const added = await empModel.create(req.body)
    console.log(added)

    if (added) {
        console.log("Data Added....")
    }
    else { console.log("Data not added.....") }

    res.redirect("/employee")
}

// view 
const allEmployee = async (req, res) => {
    const allData = await empModel.find()
    res.render("viewPage", { allData })
}


// delete
const deleteEmployee = async (req, res) => {
    // console.log("Delete id ", req.query.deleteId)
    const deleted = await empModel.findByIdAndDelete(req.query.deleteId)

    if (deleted) { console.log("deleted") }
    else {
        console.log("not deleted")
    }
    res.redirect("/employee")
}

// edit page
const editPage = async (req, res) => {

    const editData = await empModel.findById(req.params.idd)
    // console.log("data", editData)
    res.render("editPage", { editData })
}


// update Logic
const updateEmployee = async (req, res) => {
// console.log(req.body) 
    
    const editData = await empModel.findByIdAndUpdate(req.body.id,req.body,{new:true})
    res.redirect("/employee/allEmp")
}

module.exports = { empFormPage, addEmployee, allEmployee, deleteEmployee, editPage, updateEmployee }