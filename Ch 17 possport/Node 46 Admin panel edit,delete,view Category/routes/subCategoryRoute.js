
const express=require("express")
const { addsubCategoryPage,viewsubCategoryPage,addsubCategoryFun } = require("../controller/subCategoryController")
const subCategoryRoute=express.Router()

subCategoryRoute.get("/addsubCategoryPage",addsubCategoryPage)
subCategoryRoute.post("/postSubCategory",addsubCategoryFun)

subCategoryRoute.get("/viewsubCategoryPage",viewsubCategoryPage)


module.exports=subCategoryRoute