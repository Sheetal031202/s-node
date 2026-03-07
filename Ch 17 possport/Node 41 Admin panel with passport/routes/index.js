const express = require("express")
// 9
const passport = require("passport")

const { adminLoginShowFun, adminLoginCheckedFun, newPassSetFun, forgetPassSetPageShowFun, otpVerifyFun, changePasswordFun, changePasswordLogicFun, forgetPasswordVerifyEmailFun, logOutFun, dashboardPageShowFun, addAdminPageShowFun, viewAdminPageShowFun, addAdminLogicFun
    , deleteAdminFun, editAdminPageShowFun, editAdminLogicFun,
    profilePageShowFun,
    otpVerifyPageShowFun } = require("../controller/pageController")

const myUpload = require("../middleware/multer.middleware")

const route = express.Router()

route.get("/otpVerifyPage", otpVerifyPageShowFun)

route.post("/otpVerifyPost", otpVerifyFun)

route.get("/forgetPassSetPage", forgetPassSetPageShowFun)

route.post("/newPassSet", newPassSetFun)



route.get("/", adminLoginShowFun)
// 9 middleware
// AdminLocalAuth aa name passport js ma stategy banavi tyare didhu hatu te chhe
// route.post("/adminLoginChecked",
//      passport.authenticate("adminLocalAuth ",{failureRedirect:"/"}),adminLoginCheckedFun)

route.post( "/adminLoginChecked",
    passport.authenticate("adminLocalAuth", { failureRedirect: "/" }), adminLoginCheckedFun
)

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