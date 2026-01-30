const express = require("express")
const multer = require("multer")
const { dashboardPageShowFun, addAdminPageShowFun, viewAdminPageShowFun, addAdminLogicFun
     ,deleteAdminFun,editAdminPageShowFun, editAdminLogicFun} = require("../controller/pageController")
const route = express.Router()

const myStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/admin/")
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_ ${file.originalname}`)

    }
})
const myUpload=multer({storage:myStorage})


route.get("/", dashboardPageShowFun)
route.get("/addAdminPage", addAdminPageShowFun)
route.get("/viewAdminPage", viewAdminPageShowFun)

// add data
route.post("/postAddAdmin",myUpload.single("image") ,addAdminLogicFun)


// delete data
route.get("/deleteAdmin",deleteAdminFun)

// edit page show
route.get("/editAdmin/:editId",editAdminPageShowFun)
// edit logic
route.post("/postEditAdmin/:iid",myUpload.single("image"),editAdminLogicFun)

module.exports = route