const mongoose=require("mongoose")

const mySchema=mongoose.Schema({
    name:{
        type:String
    },
     phone:{
        type:String
    }, age:{
        type:String
    }, gender:{
        type:String
    }, role:{
        type:String
    },
     salary:{
        type:String
    }, address:{
        type:String
    },

})

const model=mongoose.model("chh 18",mySchema)
module.exports=model