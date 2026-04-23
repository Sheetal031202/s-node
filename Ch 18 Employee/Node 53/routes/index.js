const express=require("express")
const route=express.Router()

route.use("/employee",require("./employee"))

module.exports=route