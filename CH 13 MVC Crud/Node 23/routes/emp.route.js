const express=require("express")
const { empFormPage } = require("../controller/empController")


const empRoute=express.Router()

empRoute.get("/",empFormPage)

module.exports=empRoute