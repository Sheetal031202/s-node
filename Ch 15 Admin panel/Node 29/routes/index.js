const express = require("express")
// 1
const multer = require("multer")
const { dashboardPageShowFun, addAdminPageShowFun, viewAdminPageShowFun, addAdminLogicFun } = require("../controller/pageController")
const route = express.Router()

// 2
const myStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/admin/")
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_ ${file.originalname}`)

    }
})
// 3
const myUpload=multer({storage:myStorage})


route.get("/", dashboardPageShowFun)
route.get("/addAdminPage", addAdminPageShowFun)
route.get("/viewAdminPage", viewAdminPageShowFun)


// post
// 4 middleware myUpload
// 5 from ma encrypt check karvnau 
// 6 controler ma javanu
route.post("/postAddAdmin",myUpload.single("image") ,addAdminLogicFun)


module.exports = route