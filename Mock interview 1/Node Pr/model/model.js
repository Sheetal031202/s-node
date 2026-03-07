const mongoose=require("mongoose")

const mockSchema=mongoose.Schema({
    name:{
        type:String
    },
     std:{
        type:String
    },
     div:{
        type:String
    },
    image:{
        type:String
    }
})



const mockModel=mongoose.model("mockCollection",mockSchema)

module.exports=mockModel