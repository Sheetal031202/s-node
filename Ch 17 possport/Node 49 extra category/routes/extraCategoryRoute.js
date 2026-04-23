const express=require("express")
const { showAddExtraCategoryPage, showViewExtraCategoryPage } = require("../controller/extraCaregoryController")
const extraCatRoute=express.Router()



extraCatRoute.get("/addExtraCategoryPage",showAddExtraCategoryPage)
extraCatRoute.get("/viewExtraCategoryPage",showViewExtraCategoryPage)

module.exports=extraCatRoute