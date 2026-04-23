const express=require("express")
const { addEmployeePostFun, fetchEmployeeFun,deleteEmployeeFun,updateEmployeeFun,singleFetchEmployeeFun} = require("../controller/employeeController")
const employeeRoute=express.Router()


// add employee
// employeeRoute.post("/addemp",addEmployeePostFun)
employeeRoute.post("/",addEmployeePostFun)

// fetch employee
// employeeRoute.get("/fetchemp",fetchEmployeeFun)
employeeRoute.get("/",fetchEmployeeFun)

// delete employee
// employeeRoute.delete("/deleteemp/:id",deleteEmployeeFun)
employeeRoute.delete("/:id",deleteEmployeeFun)

// update employee
// employeeRoute.patch("/updateemp/:id",updateEmployeeFun)
employeeRoute.patch("/:id",updateEmployeeFun)

// single
// employeeRoute.get("/singlefetchemp/:id",singleFetchEmployeeFun)
employeeRoute.get("/:id",singleFetchEmployeeFun)


module.exports=employeeRoute