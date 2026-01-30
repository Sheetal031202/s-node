const fs = require("fs")
// model require
const adminModel = require("../model/adminModel")

const adminLoginShowFun = async (req, res) => {
    const data = await adminModel.findById(req.cookies.adminId)

    if (req.cookies.adminId && data) {
        return res.redirect("/dashboardPage")
    }
    return res.render("auth/adminLoginPage",{data})
}



// 2
const profilePageShowFun = async (req, res) => {
    try {
        const data = await adminModel.findById(req.cookies.adminId)
        if (req.cookies.adminId == undefined && !data) {
            return res.redirect("/")
        }
        return res.render("profile/profilePage", { data })
    }
    catch (error) {
        console.log("Server Error", error)
        res.redirect("/")
    }
}

const adminLoginCheckedFun = async (req, res) => {
    try {
        // console.log("data", req.body)

        const checked = await adminModel.findOne({ email: req.body.email })
        // console.log("checked Data", checked)

        if (!checked) {
            console.log("Admin data not found")
            return res.redirect("/")
        }
        if (checked.password != req.body.password) {
            console.log("password data not found")
            return res.redirect("/")
        }


        res.cookie("adminId", checked._id)
        return res.redirect("/dashboardPage")


    } catch (error) {
        console.log("Server Error", error)
        res.redirect("/")
    }
}

// logout
const logOutFun = (req, res) => {
    res.clearCookie("adminId")
    res.redirect("/")
}

const changePasswordFun = async (req, res) => {

    const data = await adminModel.findById(req.cookies.adminId)
    //  console.log(data)
    if (req.cookies.adminId == undefined && !data) {
        return res.redirect("/")
    }

    return res.render("auth/changePasswordPage",{data})
}

const changePasswordLogicFun = async (req, res) => {

    try {

        const data = await adminModel.findById(req.cookies.adminId)
        if (req.cookies.adminId == undefined && !data) {
            return res.redirect("/")
        }


        console.log("data", req.body)
        console.log("one", req.body.password)
        console.log("one", req.body.newPassword)
        console.log("one", req.body.confirmPassword)

        // current password math with database
        if (req.body.password != data.password) {
            console.log(" pass not mathch with data base")
            return res.redirect("/changePassword")

        }

        // new  and current pass same
        if (req.body.password == req.body.newPassword) {
            console.log("new and old  same")
            return res.redirect("/changePassword")

        }

        if (req.body.newPassword != req.body.confirmPassword) {
            console.log("new and confirm not  same")
            return res.redirect("/changePassword")

        }

        const passwordChange = await adminModel.findByIdAndUpdate(data._id, { password: req.body.newPassword }, { new: true })

        //cookie clea
        if (passwordChange) {
            console.log("change password")
            // 3
            res.clearCookie("adminId")

        }
        else {
            console.log("not changed password")

        }
        res.redirect("/dashboardPage")
    } catch (error) {
        console.log("not change password ", error)
        res.redirect("/changePassword")
    }
}
// dashborad show
const dashboardPageShowFun = async (req, res) => {
    const data = await adminModel.findById(req.cookies.adminId)

    if (req.cookies.adminId == undefined && !data) {
        return res.redirect("/")
    }

    return res.render("dashboardPage",{data})
}

// Admin show
const addAdminPageShowFun = async (req, res) => {
    const data = await adminModel.findById(req.cookies.adminId)
    if (req.cookies.adminId == undefined && !data) {
        return res.redirect("/")
    }
    res.render("addAdminPage",{data})
}


// view all Admin
const viewAdminPageShowFun = async (req, res) => {
    try {
        const data = await adminModel.findById(req.cookies.adminId)

        if (req.cookies.adminId == undefined && !data) {
            return res.redirect("/")
        }


        
 let allAdminData = await adminModel.find()
       allAdminData= allAdminData.filter((e)=>e.email !=data.email)
        res.render("viewAdminPage", { allAdminData ,data})
    } catch (error) {
        console.log("Server Error", error)
        res.redirect("/viewAdminPage", { allAdminData })
    }
}

// add admin logic
const addAdminLogicFun = async (req, res) => {
    req.body.image = req.file.path

    try {
        // console.log(req.body)
        // console.log(req.file)

        let added = await adminModel.create(req.body)
        if (added) { console.log("admin added") }
        else { console.log("admin not added") }
        res.redirect("/addAdminPage")


    } catch (error) {
        console.log("Server Error", error)
        res.redirect("/addAdminPage")
    }

}

// delete
const deleteAdminFun = async (req, res) => {
    // console.log("DELETED id..", req.query.deleteId)
    try {


        const data = await adminModel.findById(req.cookies.adminId)

        if (req.cookies.adminId == undefined && !data) {
            return res.redirect("/")
        }
        const deleted = await adminModel.findByIdAndDelete(req.query.deleteId)
        // console.log("DElete Dtaa", deleted)
        if (deleted) {
            fs.unlink(deleted.image, () => { })
            console.log("admin deleted")
        }
        else { console.log("admin not deleted") }
        res.redirect("/viewAdminPage")


    } catch (error) {
        console.log("Server Error", error)
        res.redirect("/viewAdminPage")
    }
}

// show edit page
const editAdminPageShowFun = async (req, res) => {
    try {
        const data = await adminModel.findById(req.cookies.adminId)

        if (req.cookies.adminId == undefined && !data) {
            return res.redirect("/")
        }
        const singleData = await adminModel.findById(req.params.editId)
        console.log("Edit ID", req.params.editId)
        console.log("Edit Data", singleData)
        res.render("editAdminPage", { singleData ,data})
    }

    catch (error) {
        console.log("Server Error", error)
        res.redirect("/viewAdminPage")
    }
}

// edit post  logic
const editAdminLogicFun = async (req, res) => {
    try {
        const data = await adminModel.findById(req.cookies.adminId)

        if (req.cookies.adminId == undefined && !data) {
            return res.redirect("/")
        }


        console.log(req.params.iid)

        if (req.file) {
            // save new image path
            req.body.image = req.file.path;
            // get old data first
            let oldData = await adminModel.findById(req.params.iid);
            // update record
            let updated = await adminModel.findByIdAndUpdate(req.params.iid, req.body, { new: true });
            if (updated) {
                if (oldData.image) {
                    fs.unlink(oldData.image, (err) => { });
                }
                console.log("admin updated with image");
            }

        } else {

            let updated = await adminModel.findByIdAndUpdate(req.params.iid, req.body, { new: true });

            if (updated) {
                console.log("admin updated without image");
            }
        }

        res.redirect("/viewAdminPage");

    } catch (error) {
        console.log("Server Error", error);
        res.redirect("/viewAdminPage");
    }
};








module.exports = {
    adminLoginShowFun, adminLoginCheckedFun, logOutFun, changePasswordFun, changePasswordLogicFun, profilePageShowFun,
    dashboardPageShowFun, addAdminPageShowFun, viewAdminPageShowFun,
    addAdminLogicFun, deleteAdminFun, editAdminPageShowFun, editAdminLogicFun
}
