const mongoose=require("mongoose")
const URL="mongodb://localhost:27017/product"

mongoose.connect(URL)
.then(()=>{console.log("Database connected")})
.catch((e)=>{console.log("Database not connected..")})