const express=require("express")
const { dashboardPageShowFun, addAdminPageShowFun, viewAdminPageShowFun } = require("../controller/pageController")
const route=express.Router()

route.get("/",dashboardPageShowFun)
route.get("/addAdminPage",addAdminPageShowFun)
route.get("/viewAdminPage",viewAdminPageShowFun)



module.exports=route