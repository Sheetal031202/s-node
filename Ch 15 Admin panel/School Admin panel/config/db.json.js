const mongoose=require("mongoose")
const URL="mongodb://localhost:27017/stuProjectAdminpanel"

mongoose.connect(URL)
.then(()=>{
    console.log("Database connected successfully...")
})
.catch((e)=>{
        console.log("Database connected failed...",e)

})

module.exports=mongoose