const mongoose=require("mongoose")
const URI="mongodb://localhost:27017/pr-7"

mongoose.connect(URI)
.then(()=>{console.log("database connected")})
.catch((er)=>{console.log("database not connected",er)})