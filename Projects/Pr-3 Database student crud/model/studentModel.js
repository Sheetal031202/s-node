const mongoose=require("mongoose")

 const stuSchema=mongoose.Schema({
    stuName:{
        type:String,
        required:true
    },
stuImg:{
        type:String,
        required:true
    },
})

const stuModel=mongoose.model("stuCollection",stuSchema)

module.exports=stuModel