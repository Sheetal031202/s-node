const mongoose=require("mongoose")

const URL="mongodb://localhost:27017/adminPractise"

mongoose.connect(URL)
.then(()=>{console.log("database connected successfully")})
.catch((e)=>{console.log("database not  connected successfully"),e})

