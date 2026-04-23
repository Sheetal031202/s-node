
const express=require("express")
const { addsubCategoryPage,viewsubCategoryPage,addsubCategoryFun,deleteSubCategory ,editPage,editFun} = require("../controller/subCategoryController")
const subCategoryRoute=express.Router()

subCategoryRoute.get("/addsubCategoryPage",addsubCategoryPage)
subCategoryRoute.post("/postSubCategory",addsubCategoryFun)

subCategoryRoute.get("/viewsubCategoryPage",viewsubCategoryPage)

subCategoryRoute.get("/deleteSubCategory/:id",deleteSubCategory)

subCategoryRoute.get("/editSubcategory/:id",editPage)
subCategoryRoute.post("/postEditSubCategory/:id",editFun)


module.exports=subCategoryRoute