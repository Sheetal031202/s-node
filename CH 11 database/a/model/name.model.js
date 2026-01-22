const mongoose=require("mongoose")


const aaSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
     std:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
})

const aaModel=mongoose.model("aaModel",aaSchema,"aaCollection")
module.exports=aaModel