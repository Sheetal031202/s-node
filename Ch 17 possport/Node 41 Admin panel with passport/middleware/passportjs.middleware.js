// 1 require
const passport = require("passport")
const localStrategy = require("passport-local").Strategy

// 4
const adminModel = require("../model/adminModel")

// 2
// use ma loval stategy ni method
// local startegy 2 parameter ley object and function
// function ma 3 parameter 1=jenathi authentication  karvu e, 2=password,3rd done name no call back function
passport.use("adminLocalAuth", new localStrategy({
    usernameField: "email"
},
    async (email, password, done) => {
        // 4
        const admin = await adminModel.findOne({ email })
        console.log("Data", admin)
        if (!admin) {
            return done(null, false)
        }
        if (password != admin.password) {
            return done(null, false)
        }
        return done(null, admin)
    }
))

// 5
passport.serializeUser((userData, done) => {
    console.log("sentralise data", userData)
    return done(null, userData.id)
})

// 6 only id accept karse deserialize
// to store in sesseion
passport.deserializeUser(async (userId, done) => {
    console.log("deserializeUser data", userId)

    const currentData = await adminModel.findById(userId)
    console.log("deserializeUser data", currentData)

    return done(null, currentData)
})

