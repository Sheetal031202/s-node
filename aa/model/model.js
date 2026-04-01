const mongoose=require("mongoose")

const s=mongoose.Schema({
    name:{
        type:String
    }  ,
    std:{
        type:String
    },

    image:{
        type:String
    }
    
})

const model=mongoose.model("shData",s)
module.exports=model