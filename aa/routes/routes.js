const express=require("express")
const { homePageShow ,
    addPageShow,addDataFun,
    viewPageShow,
    deleteFun,
    editPageShow,updateFun
} = require("../controller/controller")
const route=express.Router()
// multer
const myUpload=require('../middleware/multer')

route.get("/",homePageShow)

route.get("/add",addPageShow)
route.post("/adddata",addDataFun)
route.get("/view",viewPageShow)
route.get("/delete/:id",deleteFun)
route.get("/edit/:id",editPageShow)
route.post("/editdata/:id",updateFun)



module.exports=route