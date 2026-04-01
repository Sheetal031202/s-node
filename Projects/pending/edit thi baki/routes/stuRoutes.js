const express=require("express")
const { stuViewPageShow, stuAddFormPageShow, addStuDataFun, stuDeleteFun } = require("../controller/stuController")
const stuRoute=express.Router()


stuRoute.get("/",stuViewPageShow)
stuRoute.get("/addStuPage",stuAddFormPageShow)
stuRoute.post("/addStuData",addStuDataFun)
stuRoute.get("/delete",stuDeleteFun)


module.exports=stuRoute