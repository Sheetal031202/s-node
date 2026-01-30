const fs = require("fs")
// model require
const adminModel = require("../model/adminModel")

const adminLoginShowFun = async (req, res) => {

    const chechCookie = await adminModel.findById(req.cookies.adminId)

    if (req.cookies.adminId && chechCookie) {
        return res.redirect("/dashboardPage")
    }
    //-------------------------------------------------
    return res.render("auth/adminLoginPage")
}

const adminLoginCheckedFun = async (req, res) => {
    try {
        // console.log("data", req.body)

        const checked = await adminModel.findOne({ email: req.body.email })
     
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


    } catch (error) {
        console.log("Server Error", error)
        res.redirect("/")
    }
}


const logOutFun=(req,res)=>{
    res.clearCookie("adminId")
    res.redirect("/")
}


// dashborad show
const dashboardPageShowFun = async (req, res) => {
   
    const chechCookie = await adminModel.findById(req.cookies.adminId)

    if (req.cookies.adminId == undefined && !chechCookie) {
        return res.redirect("/")
    }

    return res.render("dashboardPage",{chechCookie})
}

// Admin show
const addAdminPageShowFun = async (req, res) => {
    const chechCookie = await adminModel.findById(req.cookies.adminId)
    if (req.cookies.adminId == undefined && !chechCookie) {
        return res.redirect("/")
    }


    res.render("addAdminPage",chechCookie)
}


// view all Admin
const viewAdminPageShowFun = async (req, res) => {
    try {
        const chechCookie = await adminModel.findById(req.cookies.adminId)

        if (req.cookies.adminId == undefined && !chechCookie) {
            return res.redirect("/")
        }


        let allAdminData = await adminModel.find()
        // 3
       allAdminData= allAdminData.filter((e)=>e.email !=chechCookie.email)
    //            // ----------------------------------------

        res.render("viewAdminPage", { allAdminData ,chechCookie})
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
        const chechCookie = await adminModel.findById(req.cookies.adminId)

        if (req.cookies.adminId == undefined && !chechCookie) {
            return res.redirect("/")
        }
        //-------------------------
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
        const chechCookie = await adminModel.findById(req.cookies.adminId)

        if (req.cookies.adminId == undefined && !chechCookie) {
            return res.redirect("/")
        }
        const singleData = await adminModel.findById(req.params.editId)
        console.log("Edit ID", req.params.editId)
        console.log("Edit Data", singleData)
        res.render("editAdminPage", { singleData ,chechCookie})
    }

    catch (error) {
        console.log("Server Error", error)
        res.redirect("/viewAdminPage")
    }
}

// edit logic
const editAdminLogicFun = async (req, res) => {
    try {
 // 10--------------------
        const chechCookie = await adminModel.findById(req.cookies.adminId)

        if (req.cookies.adminId == undefined && !chechCookie) {
            return res.redirect("/")
        }
        // ----------------------------------------


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
    adminLoginShowFun, adminLoginCheckedFun,logOutFun,
    dashboardPageShowFun, addAdminPageShowFun, viewAdminPageShowFun,
    addAdminLogicFun, deleteAdminFun, editAdminPageShowFun, editAdminLogicFun
}