const express = require("express")
const passport = require("passport")

const {
    adminLoginShowFun,
    adminLoginCheckedFun,
    newPassSetFun,
    forgetPassSetPageShowFun,
    otpVerifyFun,
    changePasswordFun,
    changePasswordLogicFun,
    forgetPasswordVerifyEmailFun,
    logOutFun,
    dashboardPageShowFun,
    addAdminPageShowFun,
    viewAdminPageShowFun,
    addAdminLogicFun,
    deleteAdminFun,
    editAdminPageShowFun,
    editAdminLogicFun,
    profilePageShowFun,
    otpVerifyPageShowFun
} = require("../controller/pageController")

const myUpload = require("../middleware/multer.middleware")

const route = express.Router()

/* ================= AUTH NOT DONE (Before Login) ================= */

// Login page
route.get("/", passport.checkAuthNotDone, adminLoginShowFun)

// Login check
route.post("/adminLoginChecked",
    passport.checkAuthNotDone,
    passport.authenticate("adminLocalAuth", { failureRedirect: "/" }),
    adminLoginCheckedFun
)

// Forget password page
route.get("/forgetPassSetPage",
    passport.checkAuthNotDone,
    forgetPassSetPageShowFun
)

// Verify email for forget password
route.post("/forgetPasswordVerifyEmail",
    passport.checkAuthNotDone,
    forgetPasswordVerifyEmailFun
)

// OTP verify page
route.get("/otpVerifyPage",
    passport.checkAuthNotDone,
    otpVerifyPageShowFun
)

// OTP verify post
route.post("/otpVerifyPost",
    passport.checkAuthNotDone,
    otpVerifyFun
)

// Set new password
route.post("/newPassSet",
    passport.checkAuthNotDone,
    newPassSetFun
)


/* ================= AUTH DONE (After Login) ================= */

// Logout
route.get("/logout",
    passport.checkAuthDone,
    logOutFun
)

// Change password
route.get("/changePassword",
    passport.checkAuthDone,
    changePasswordFun
)

route.post("/postPasswordChange",
    passport.checkAuthDone,
    changePasswordLogicFun
)

// Profile
route.get("/profilePage",
    passport.checkAuthDone,
    profilePageShowFun
)

// Dashboard
route.get("/dashboardPage",
    passport.checkAuthDone,
    dashboardPageShowFun
)

// Add admin page
route.get("/addAdminPage",
    passport.checkAuthDone,
    addAdminPageShowFun
)

// View admin page
route.get("/viewAdminPage",
    passport.checkAuthDone,
    viewAdminPageShowFun
)

// Add admin
route.post("/postAddAdmin",
    passport.checkAuthDone,
    myUpload.single("image"),
    addAdminLogicFun
)

// Delete admin
route.get("/deleteAdmin",
    passport.checkAuthDone,
    deleteAdminFun
)

// Edit admin page
route.get("/editAdmin/:editId",
    passport.checkAuthDone,
    editAdminPageShowFun
)


// Edit admin logic
route.post("/postEditAdmin/:iid",
    passport.checkAuthDone,
    myUpload.single("image"),
    editAdminLogicFun
)

route.use("/category",    passport.checkAuthDone,   require("./categoryRoute"))


module.exports = route
