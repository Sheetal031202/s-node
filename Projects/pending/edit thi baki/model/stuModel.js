const mongoose = require("mongoose")

const stuSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
    ,
    std: {
        type: Number,
        required: true
    } ,
     div: {
        type: String,
        required: true
    } ,
     gender: {
        type: String,
        required: true
    },
      sub:{
        type:[String],
        required:true
    },
      img:{
        type:String,
        required:true
    }
})


const stuModel=mongoose.model("stuCollection",stuSchema,"pr-7")

module.exports=stuModel