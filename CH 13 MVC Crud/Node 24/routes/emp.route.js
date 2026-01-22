const express=require("express")
const { empFormPage, addEmployee, allEmployee } = require("../controller/empController")


const empRoute=express.Router()

// page show
empRoute.get("/",empFormPage)

// add employee
empRoute.post("/addEmp",addEmployee)

// view all employee
empRoute.get("/allEmp",allEmployee)
module.exports=empRoute