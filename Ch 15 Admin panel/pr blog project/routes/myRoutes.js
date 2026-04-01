const express=require("express")
const myUpload = require("../middleware/multer")

const { dashboardPageOpen,
     addAdminPageOpen ,addAdminLogicFun,
    viewAdminPageOpen,
    editPageOpen,editLogicfun,
    deleteDataFUn,
    logInPageOpen,loginDataGetLogicFun
} = require("../controller/myController")

const route=express.Router()

// dash board open page
route.get("/dashboardPage",dashboardPageOpen)
// ------------------------------------------------------------------------------------------

// add admin page open
route.get("/addAdminPage",addAdminPageOpen)
// add data logic
route.post("/addAdminLogic",myUpload.single("image"),addAdminLogicFun)
// ------------------------------------------------------------------------------------------


// view all admin
route.get("/viewAdminPage",viewAdminPageOpen)
// ------------------------------------------------------------------------------------------


// edit page
route.get("/editPageOpen/:id",editPageOpen)
route.post("/editLogic/:id",myUpload.single("image"),editLogicfun)

// delete
route.get("/deleteData/:id",deleteDataFUn)

// log in page open
route.get("/",logInPageOpen)
route.post("/loginDataGetLogic",loginDataGetLogicFun)




module.exports=route