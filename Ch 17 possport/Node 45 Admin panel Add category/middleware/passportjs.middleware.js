const passport = require("passport")
const localStrategy = require("passport-local").Strategy

const adminModel = require("../model/adminModel")

passport.use("adminLocalAuth", new localStrategy({
    usernameField: "email"
},
    async (email, password, done) => {
        const admin = await adminModel.findOne({ email })
        // console.log("Data", admin)
        if (!admin) {
                    console.log("admin not found")

            return done(null, false)
        }
        if (password != admin.password) {
                                console.log("Password in correct")

            return done(null, false)
        }
        return done(null, admin)
    }
))

passport.serializeUser((userData, done) => {
    // console.log("sentralise data", userData)
    return done(null, userData.id)
})

passport.deserializeUser(async (userId, done) => {
    // console.log("deserializeUser data", userId)

    const currentData = await adminModel.findById(userId)
    // console.log("deserializeUser data", currentData)

    return done(null, currentData)
})




passport.checkAuthDone=(req,res,next)=>{
    console.log("is authenticate value",req.isAuthenticated())
    
    if(req.isAuthenticated()){
      return next()
    }

    return res.redirect("/")
}




passport.checkAuthNotDone=(req,res,next)=>{
    console.log("is authenticate value",req.isAuthenticated())
    
    if(!req.isAuthenticated()){
      return next()
    }

    return res.redirect("/dashboardPage")
}


// 5.1
passport.currentAdmin = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.currentAdminData = req.user
    }
    next()
}