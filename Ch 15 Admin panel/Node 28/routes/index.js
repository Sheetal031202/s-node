const express=require("express")
const { dashboardPageShowFun, addAdminPageShowFun, viewAdminPageShowFun, addAdminLogicFun } = require("../controller/pageController")
const route=express.Router()

route.get("/",dashboardPageShowFun)
route.get("/addAdminPage",addAdminPageShowFun)
route.get("/viewAdminPage",viewAdminPageShowFun)


// post
route.post("/postAddAdmin",addAdminLogicFun)


module.exports=route