const mongoose=require("mongoose")
const URI="mongodb://localhost:27017/employeeMgtSystem"

mongoose.connect(URI)
.then(()=>{
    console.log("database connected")
})
.catch((e)=>{
    console.log("Database Not connected....")
})

module.exports=mongoose