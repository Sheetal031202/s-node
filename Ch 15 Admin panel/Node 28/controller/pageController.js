// model require
const adminModel = require("../model/adminModel")

const dashboardPageShowFun = (req, res) => {
    res.render("dashboardPage")
}


const addAdminPageShowFun = (req, res) => {
    res.render("addAdminPage")
}

const viewAdminPageShowFun = (req, res) => {
    res.render("viewAdminPage")
}

const addAdminLogicFun = async(req, res) => {

    try {

        // console.log(req.body)
        let added=await adminModel.create(req.body)
        if(added){console.log("admin added")}
        else{console.log("admin not added")}
        res.redirect("/addAdminPage")


    } catch (error) {
        console.log("Server Error", error)
        res.redirect("/addAdminPage")
    }




}

module.exports = { dashboardPageShowFun, addAdminPageShowFun, viewAdminPageShowFun, addAdminLogicFun }