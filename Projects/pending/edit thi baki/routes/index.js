const express=require("express")
const { homePageFun, aboutPageFun, contactPageFun } = require("../controller/pageController")
const route=express.Router()


// to home page
route.get("/",homePageFun)
// about page
route.get("/about",aboutPageFun)
// contact
route.get("/contact",contactPageFun)


// stu route
route.use("/stu",require("../routes/stuRoutes"))

module.exports=route