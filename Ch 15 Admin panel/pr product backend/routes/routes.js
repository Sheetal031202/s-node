const express=require("express")
const { homePageShow,
     addPageShow,addSuccess,
    editPageShow,editDataFun, 
    deleteFun,
    viewAllData} = require("../controller/addController")
const route=express.Router()


route.get("/",homePageShow)
route.get("/addPage",addPageShow)
route.post("/add",addSuccess)
route.get("/view",viewAllData)
route.get("/edit/:id",editPageShow)
route.put("/edit/:id",editDataFun)
route.delete("/delete/:id",deleteFun)

module.exports=route