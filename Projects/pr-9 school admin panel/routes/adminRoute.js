const express = require("express")
const { dashboardPageShowFun,
    addAdminPageShowFun, addAdminDataLogicFun,
    viewAdminPageShowFun,
    deleteAdminLogicFun,
    editAdminPageShowFun, editAdminDataLogicFun,
    // --------
    profilePageShowFun, changePasswordPageShowFun, changeAdminPasswordLogicFun,
    logInPageShowFun, adminLoginCheckedLogicFun,
    logOutLogicFun,
    forgetPassEmailPageShowFun,forgetPassSendOtpLogicFun,
     forgetPasschangePasswordPageShowFun,changeForgetPassLogic
} = require("../controller/adminController")
const route = express.Router()


// require multer
const multer = require("multer")
// multer
const myStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/admin/")
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})
// multer
const myUpload = multer({ storage: myStorage })

// show dashboard Page
route.get("/dashboardPage", dashboardPageShowFun)

// show addAdmin Page 
route.get("/addAdminPage", addAdminPageShowFun)
// add Admin Data logic post
route.post("/addAdminData", myUpload.single("image"), addAdminDataLogicFun)

// view admin page
route.get("/viewAdminPage", viewAdminPageShowFun)

// delete Admin
route.get("/deleteAdmin", deleteAdminLogicFun)


// edit pageshhiw
route.get("/editAdminPage/:editId", editAdminPageShowFun)
// edit post logic
route.post("/editAdminData/:iid", myUpload.single("image"), editAdminDataLogicFun)
// -------------------------------------



// profile show page
route.get("/profilePage", profilePageShowFun)

//  change password page show
route.get("/changePasswordPage", changePasswordPageShowFun)
// logic
route.post("/changeAdminPasswordLogic", changeAdminPasswordLogicFun)


// ----------------------------------------------------------------


// log  in page show FUn
route.get("/", logInPageShowFun)
// logIn page post req logic to check data
route.post("/adminLoginChecked", adminLoginCheckedLogicFun)

// forget password
route.get("/forgetPassEmailPage", forgetPassEmailPageShowFun)
route.post("/forgetPassCheckEmail", forgetPassSendOtpLogicFun)

// 

// change forget paass paage show
route.get("/forgetPasschangePasswordPage", forgetPasschangePasswordPageShowFun)
route.post("/changeForgetPass", changeForgetPassLogic)


// logout
route.get("/logOut", logOutLogicFun)

//
module.exports = route