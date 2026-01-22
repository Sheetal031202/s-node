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
const allEmployee=async(req,res)=>{
    const allData=await empModel.find()
    res.render("viewPage",{allData})
}
module.exports = { empFormPage, addEmployee ,allEmployee}