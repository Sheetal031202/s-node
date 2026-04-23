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

// delete Employe
const deleteEmployeeFun=async (req,res)=>
{
    try {
        let deletedData=await model.findByIdAndDelete(req.params.id)
        if(!deletedData){
           return  res.status(400).json({status:400,error:true,message:"Employee mot deleted..."})
        }
        
                   return  res.status(200).json({status:200,error:true,message:"Employee successfully deleted..."})

    } catch (error) {
        console.log("data not deleted.....")
                   return  res.status(500).json({status:500,error:true,message:"Employee not deleted..."})

    }
}

// update employee
const updateEmployeeFun=async (req,res)=>
{
    try {
        let updatedData=await model.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(!updatedData){
           return  res.status(400).json({status:400,error:true,message:"Employee not updated..."})
        }
        
                   return  res.status(200).json({status:200,error:true,message:"Employee successfully updated..."})

    } catch (error) {
        console.log("data not updated.....")
                   return  res.status(500).json({status:500,error:true,message:"Employee not updated..."})

    }
}


const singleFetchEmployeeFun=async(req,res)=>{
     try{
        const fetchSingleEmp=await model.findById(req.params.id)

        if(!fetchSingleEmp){
            return res.status(400).json({
                status:400,
                error:true,
                message:"single employee fetch failed..."
            })
        }
          return res.status(200).json({
                status:200,
                error:true,
                message:"single employee fetch successs...",
                employee:fetchSingleEmp
            })
        }
    
catch(e)
{
console.log("something went wrong..single employee not fetch")
return res.status(500).json({message:"something went wrong.. single employee not fetch"})
}
}



module.exports={addEmployeePostFun,fetchEmployeeFun,deleteEmployeeFun,updateEmployeeFun,singleFetchEmployeeFun}