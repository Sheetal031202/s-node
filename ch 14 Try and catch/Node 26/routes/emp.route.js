const express=require("express")
const { empFormPage, addEmployee, allEmployee, deleteEmployee, editPage, updateEmployee, errorPage } = require("../controller/empController")


const empRoute=express.Router()

// page show
empRoute.get("/",empFormPage)

// erropage show
empRoute.get("/error",errorPage)

// add employee
empRoute.post("/addEmp",addEmployee)

// view all employee
empRoute.get("/allEmp",allEmployee)

// delete
empRoute.get("/deleteEmp",deleteEmployee)

// edit page show
empRoute.get("/editEmp/:idd",editPage)

// updated logic
empRoute.post("/updateEmp",updateEmployee)



module.exports=empRoute