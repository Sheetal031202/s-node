const fs = require("fs")
// model require
const adminModel = require("../model/adminModel")

// 1 make login page
// 2 change route /  to /dashborad page  
//3  / ma login page open nu controller
// 4 header ma dashboard par click karine dashboard open mate a href ma path change
// 5 login form ma  ma post action karvana and name attribute lakhava
// 6 login ma post thi data get karine mongoDb sathe match karavana agar
//  email password math thay to dashborad page par redirect nahitar log in page par j revau 

// 3 login page show
//8 
const adminLoginShowFun = async (req, res) => {

    // 8 cookie no data aavo joiye and database ma cookie ma je id chhe te match hoy toj open thay dashboard 
    const chechCookie = await adminModel.findById(req.cookies.adminId)

    if (req.cookies.adminId && chechCookie) {
        return res.redirect("/dashboardPage")
    }
    //-------------------------------------------------
    return res.render("auth/adminLoginPage")
}

// 6 
// 7 aama j chhe cokkie valu
const adminLoginCheckedFun = async (req, res) => {
    try {
        // console.log("data", req.body)

        const checked = await adminModel.findOne({ email: req.body.email })
        // console.log("checked Data", checked)

        //    ----------------------------1--------------------------------------
        //  if (checked) {
        //         console.log("Admin data matchedd")
        //         if (checked.password == req.body.password) {
        //             console.log("password matchedd")
        //             res.redirect("/dashboardPage")    }
        //         else {
        //             console.log("passwor not match data not found")
        //             res.redirect("/") }
        //     }
        //     else {
        //         console.log("Admin data not found")
        //         res.redirect("/")
        //     }

        // or 
        // ------------------------------2----------------------
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


// 11 logout
const logOutFun=(req,res)=>{
    res.clearCookie("adminId")
    res.redirect("/")
}


// dashborad show
// 9 
const dashboardPageShowFun = async (req, res) => {
    // 9 cokkie ma kai nay hot to undefined aavse and undefind aave to login page par j revanu chhe
    //    // database e id hoy to j ..nahitar atyrae hu id change karu chhu to bhi dashboaard j aave chhe

    const chechCookie = await adminModel.findById(req.cookies.adminId)

    if (req.cookies.adminId == undefined && !chechCookie) {
        return res.redirect("/")
    }

    return res.render("dashboardPage")
}

// Admin show
// 10
const addAdminPageShowFun = async (req, res) => {
    // 10
    const chechCookie = await adminModel.findById(req.cookies.adminId)
    if (req.cookies.adminId == undefined && !chechCookie) {
        return res.redirect("/")
    }


    res.render("addAdminPage")
}


// view all Admin
// 10
const viewAdminPageShowFun = async (req, res) => {
    try {
        // 10--------------------
        const chechCookie = await adminModel.findById(req.cookies.adminId)

        if (req.cookies.adminId == undefined && !chechCookie) {
            return res.redirect("/")
        }
        // ----------------------------------------


        const allAdminData = await adminModel.find()
        res.render("viewAdminPage", { allAdminData })
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

// 10
// delete
const deleteAdminFun = async (req, res) => {
    // console.log("DELETED id..", req.query.deleteId)
    try {

        // 10---------
         // 10--------------------
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

// 10
// show edit page
const editAdminPageShowFun = async (req, res) => {
    try {
 // 10--------------------
        const chechCookie = await adminModel.findById(req.cookies.adminId)

        if (req.cookies.adminId == undefined && !chechCookie) {
            return res.redirect("/")
        }
// -------------------------------------------------------
        const singleData = await adminModel.findById(req.params.editId)
        console.log("Edit ID", req.params.editId)
        console.log("Edit Data", singleData)
        res.render("editAdminPage", { singleData })
    }

    catch (error) {
        console.log("Server Error", error)
        res.redirect("/viewAdminPage")
    }
}

// 10
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