const mongoose=require("mongoose")
const dotenv=require("dotenv")
dotenv.config()
const URL=process.env.MONGO_URL

mongoose.connect(URL)
.then(()=>{console.log("database conected successfully....")})
.catch((e)=>{console.log("database not conected successfully...")})

module.exports=mongoose