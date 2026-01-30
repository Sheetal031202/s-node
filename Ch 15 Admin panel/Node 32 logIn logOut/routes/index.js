const express = require("express")
const multer = require("multer")
const { adminLoginShowFun,adminLoginCheckedFun,logOutFun,dashboardPageShowFun, addAdminPageShowFun, viewAdminPageShowFun, addAdminLogicFun
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


// 2
route.get("/",adminLoginShowFun)
// 6
route.post("/adminLoginChecked",adminLoginCheckedFun)
// 11
route.get("/logout",logOutFun)
route.get("/dashboardPage", dashboardPageShowFun)
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