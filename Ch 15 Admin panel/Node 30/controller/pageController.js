const fs = require("fs")
// model require
const adminModel = require("../model/adminModel")

// dashborad show
const dashboardPageShowFun = (req, res) => {
    res.render("dashboardPage")
}

// Admin show
const addAdminPageShowFun = (req, res) => {
    res.render("addAdminPage")
}


// view all Admin
const viewAdminPageShowFun = async (req, res) => {

    try {

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


// delete
const deleteAdminFun = async (req, res) => {
    // console.log("DELETED id..", req.query.deleteId)
    try {
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


// eidt logic

const editAdminLogicFun = async (req, res) => {
    try {
      console.log(  req.params.iid)

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
    dashboardPageShowFun, addAdminPageShowFun, viewAdminPageShowFun,
    addAdminLogicFun, deleteAdminFun, editAdminPageShowFun, editAdminLogicFun
}