const express=require("express")
const { addEmployeePostFun, fetchEmployeeFun} = require("../controller/employeeController")
const employeeRoute=express.Router()


// add employee
// fetch employee

employeeRoute.post("/addemp",addEmployeePostFun)
employeeRoute.get("/fetchemp",fetchEmployeeFun)

module.exports=employeeRoute