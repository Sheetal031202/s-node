const empModel = require("../model/empModel")

// show "/employee" page
const empFormPage = (req, res) => {
    res.render("empForm")
}

// show error page
const errorPage = (req, res) => {
    res.render("errorPage")
}
// add Data
const addEmployee = async (req, res) => {

    try {
        const added = await empModel.create(req.body)
        // console.log(added)

        if (added) {
            console.log("Data Added....")
        }
        else { console.log("Data not added.....") }

        res.redirect("/employee")

    } catch (e) {
        console.log(e)
        console.log(e.message)
        return res.redirect("/error")
    }
}

// view 
const allEmployee = async (req, res) => {
    try {
        const allData = await empModel.find()
        res.render("viewPage", { allData })
    } catch (e) {
        console.log(e)
        console.log(e.message)
        return res.redirect("/error")
    }
}


// delete
const deleteEmployee = async (req, res) => {
    // console.log("Delete id ", req.query.deleteId)
    try {
        const deleted = await empModel.findByIdAndDelete(req.query.deleteId)

        if (deleted) { console.log("deleted") }
        else {
            console.log("not deleted")
        }
        res.redirect("/employee")

    } catch (e) {
        console.log(e)
        console.log(e.message)
        return res.redirect("/error")
    }
}

// edit page
const editPage = async (req, res) => {

    try {
        const editData = await empModel.findById(req.params.idd)
        // console.log("data", editData)
        res.render("editPage", { editData })
    }
    catch (e) {
        console.log(e)
        console.log(e.message)
        return res.redirect("/error")
    }
}


// update Logic
const updateEmployee = async (req, res) => {
    // console.log(req.body) 
    try {

        const editData = await empModel.findByIdAndUpdate(req.body.id, req.body, { new: true })
        res.redirect("/employee/allEmp")

    }

    catch (e) {
        console.log(e)
        console.log(e.message)
        return res.redirect("/error")
    }
}

module.exports = { empFormPage, addEmployee, allEmployee, deleteEmployee, editPage, updateEmployee, errorPage }