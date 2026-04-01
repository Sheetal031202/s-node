const express = require("express")
const upload=require("../middleware/categoryMulter")

const { addCategoryPageShowFun ,postCategory,viewCategoryPageShowFun} = require("../controller/categoryControleer")

const categoryroute = express.Router()

categoryroute.get("/addCategoryPage", addCategoryPageShowFun)
categoryroute.post("/postCategory",upload.single("categoryImage"),postCategory)
categoryroute.get("/viewCategoryPage", viewCategoryPageShowFun)

module.exports = categoryroute