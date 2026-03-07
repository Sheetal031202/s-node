const express = require("express")
const multer = require("multer")
const { adminLoginShowFun, adminLoginCheckedFun, newPassSetFun, forgetPassSetPageShowFun, otpVerifyFun, changePasswordFun, changePasswordLogicFun, forgetPasswordVerifyEmailFun, logOutFun, dashboardPageShowFun, addAdminPageShowFun, viewAdminPageShowFun, addAdminLogicFun
    , deleteAdminFun, editAdminPageShowFun, editAdminLogicFun,
    profilePageShowFun,
    otpVerifyPageShowFun } = require("../controller/pageController")
const route = express.Router()

const myStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/admin/")
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_ ${file.originalname}`)
    }
})
const myUpload = multer({ storage: myStorage })

// 1 forget pass nu page create
// 2 forgetPass nu page open mate  route and  contoler ..log in na recover  btn ma path chnge a href maa
route.get("/otpVerifyPage", otpVerifyPageShowFun)
// 3 
route.post("/otpVerifyPost", otpVerifyFun)
// 6 forget password set page show
route.get("/forgetPassSetPage", forgetPassSetPageShowFun)
// 7
route.post("/newPassSet", newPassSetFun)

route.get("/", adminLoginShowFun)
route.post("/adminLoginChecked", adminLoginCheckedFun)
route.get("/logout", logOutFun)

// change password
route.get("/changePassword", changePasswordFun)
route.post("/postPasswordChange", changePasswordLogicFun)

// forget password
route.post("/forgetPasswordVerifyEmail", forgetPasswordVerifyEmailFun)

// profile page
route.get("/profilePage", profilePageShowFun)

route.get("/dashboardPage", dashboardPageShowFun)
route.get("/addAdminPage", addAdminPageShowFun)
route.get("/viewAdminPage", viewAdminPageShowFun)

// add data
route.post("/postAddAdmin", myUpload.single("image"), addAdminLogicFun)
// delete data
route.get("/deleteAdmin", deleteAdminFun)
// edit page show
route.get("/editAdmin/:editId", editAdminPageShowFun)
// edit logic
route.post("/postEditAdmin/:iid", myUpload.single("image"), editAdminLogicFun)

module.exports = route