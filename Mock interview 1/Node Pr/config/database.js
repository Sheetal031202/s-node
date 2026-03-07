const mongoose=require("mongoose")
const URL="mongodb://localhost:27017/mock1"

require("../model/model")

mongoose.connect(URL)
.then(()=>{
    console.log("database connected successfully...")
})
.catch(()=>{
    console.log("database not connected....")
})