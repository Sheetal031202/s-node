const express = require("express")
const upload=require("../middleware/categoryMulter")

const { addCategoryPageShowFun ,postCategory,viewCategoryPageShowFun,deleteCatFun,editCategoryPage,postEditCategoryLogic} = require("../controller/categoryControleer")

const categoryroute = express.Router()

categoryroute.get("/addCategoryPage", addCategoryPageShowFun)
categoryroute.post("/postCategory",upload.single("categoryImage"),postCategory)
categoryroute.get("/viewCategoryPage", viewCategoryPageShowFun)

categoryroute.get("/deleteCategory/:id",deleteCatFun)

categoryroute.get("/editCategory/:id",editCategoryPage)
categoryroute.post("/postEditCategory/:id",  upload.single("categoryImage")
,postEditCategoryLogic)



module.exports = categoryroute