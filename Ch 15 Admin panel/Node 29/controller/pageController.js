// model require
const adminModel = require("../model/adminModel")

const dashboardPageShowFun = (req, res) => {
    res.render("dashboardPage")
}


const addAdminPageShowFun = (req, res) => {
    res.render("addAdminPage")
}

const viewAdminPageShowFun =async (req, res) => {

try {

    const allAdminData=await adminModel.find()
    res.render("viewAdminPage",{allAdminData})


    
} catch (error) {
        console.log("Server Error", error)
    res.render("viewAdminPage",{allAdminData})
    }


}

// add
const addAdminLogicFun = async (req, res) => {

    // 6 iamge post ma 
    // console.log(req.file)
    req.body.image = req.file.path

    try {

        // console.log(req.body)
            console.log(req.file)

        let added = await adminModel.create(req.body)
        if (added) { console.log("admin added") }
        else { console.log("admin not added") }
        res.redirect("/addAdminPage")


    } catch (error) {
        console.log("Server Error", error)
        res.redirect("/addAdminPage")
    }

}

module.exports = { dashboardPageShowFun, addAdminPageShowFun, viewAdminPageShowFun, addAdminLogicFun }