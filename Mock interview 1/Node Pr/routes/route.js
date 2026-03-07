const express=require("express")
const myUpload=require("../middleware/multer")


const { homepageShowFun,
     addpageShowFun, addDataLogic,
     editpageShowFun,editDataLogic,
deleteFun} = require("../controller/myController")
const route=express.Router()

// home page
route.get("/",homepageShowFun)

// add data
route.get("/add",addpageShowFun)
route.post("/addMyData",myUpload.single("image"),addDataLogic)


// edit
route.get("/edit/:id",editpageShowFun)
route.post("/editMyData/:id",myUpload.single("image"),editDataLogic)

route.get("/delete/:id",deleteFun)

module.exports=route