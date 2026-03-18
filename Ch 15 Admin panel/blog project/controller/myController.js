const myModel = require("../model/myschema")
const fs = require("fs")

// dash board open page
const dashboardPageOpen = (req, res) => {
    res.cookie("name", "sheetal")
    res.cookie("login", "true")
    res.render("dashboardPage")
}

// add admin page open
const addAdminPageOpen = (req, res) => {
    console.log("cooie dsta", req.cookies)
    res.render("addAdminPage")
}

const addAdminLogicFun = async (req, res) => {
    try {
        // console.log("add req.body", req.body)
        // console.log(req.file)
        req.body.image = req.file.path
        const added = await myModel.create(req.body)
        // console.log("added ", added)
        if (added) {

            res.redirect("/addAdminPage")
        }

    } catch (error) {
        res.status(400).json({
            success: false,
            message: ` not added admin date ${error}`
        })
    }
}

// view page open
const viewAdminPageOpen = async (req, res) => {
    try {
        const allAdmin = await myModel.find()
        // console.log("all admin", allAdmin)
        if (allAdmin) {
            res.render("viewAdminPage", { allAdmin })
        }

    } catch (error) {
        res.status(400).json({
            success: false,
            message: ` not showing view admin data ${error}`
        })
    }
}


// edit
const editPageOpen = async (req, res) => {
    const editId = await myModel.findById(req.params.id)
    // console.log("edit id na Data", editId)
    res.render("editPage", { editId })
}

const editLogicfun = async (req, res) => {
    try {

        if (req.file) {


            const up = await myModel.findById(req.params.id)
            console.log("ip", up)
            fs.unlink(up.image, () => { })
            req.body.image = req.file.path


            const editData = await myModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
            console.log("edit done", editData)
            res.redirect("/viewAdminPage")
        }
        else {
            const editData = await myModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
            console.log("edit done", editData)
            res.redirect("/viewAdminPage")
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: ` not update admin data ${error}`
        })
    }
}


const deleteDataFUn = async (req, res) => {
    try {
        const deleted = await myModel.findByIdAndDelete(req.params.id)
        console.log("delet id ", deleted)
        if (deleted) {
            fs.unlink(deleted.image, () => { })
            console.log("data deleted")

            res.redirect("/viewAdminPage")

        }

    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: ` not deleted admin data ${error}`
        })
    }
}


const logInPageOpen = (req, res) => {
    res.render("logInPage")
}

const loginDataGetLogicFun = async (req, res) => {
    const checked = await myModel.findOne({ email: req.body.email })
    console.log("log in data", checked.password)

     if (!checked) {
            console.log("Admin data not found")
            return res.redirect("/")
        }
        if (checked.password != req.body.password) {
            console.log("password data not found")
            return res.redirect("/")
        }

        // 7 
        res.cookie("adminId", checked._id)
        return res.redirect("/dashboardPage")
}

module.exports = {
    dashboardPageOpen,
    addAdminPageOpen, addAdminLogicFun,
    viewAdminPageOpen,
    editPageOpen, editLogicfun,
    deleteDataFUn,
    logInPageOpen, loginDataGetLogicFun
}