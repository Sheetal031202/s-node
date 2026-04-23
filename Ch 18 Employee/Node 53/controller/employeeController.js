const model=require("../model/employeeModel")

// add employee
const addEmployeePostFun=async(req,res)=>{
    try{
        const newEmp=await model.create(req.body)

        if(!newEmp){
            return res.status(400).json({
                status:400,
                error:true,
                message:"employee insertion failed..."
            })
        }
          return res.status(201).json({
                status:201,
                error:true,
                message:"employee insertion successs..."
            })
        }
    
catch(e)
{
console.log("something went wrong..employee not added")
return res.status(500).json({message:"something went wrong..employee not added"})
}
}

// fetch employee data
const fetchEmployeeFun=async(req,res)=>{
     try{
        const fetchEmp=await model.find()

        if(!fetchEmp){
            return res.status(400).json({
                status:400,
                error:true,
                message:"employee fetch failed..."
            })
        }
          return res.status(200).json({
                status:200,
                error:true,
                message:"employee fetch successs...",
                employee:fetchEmp
            })
        }
    
catch(e)
{
console.log("something went wrong..employee not fetch")
return res.status(500).json({message:"something went wrong..employee not fetch"})
}
}



module.exports={addEmployeePostFun,fetchEmployeeFun}