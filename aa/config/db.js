const mongoose=require("mongoose")
const URL="mongodb://localhost:27017/sh"

mongoose.connect(URL)
.then(()=>{
    console.log("database connected.....")
})
.catch((e)=>{console.log("database not connected......")})
