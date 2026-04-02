const mongoose=require("mongoose")

const mySchema=mongoose.Schema({
    fname:{
        type:String
    },
    lname:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    contact:{
        type:Number
    },
    gender:{
        type:String
    },hobby:{
        type:Array
    },
    city:{
        type:String
    },
    about:{
        type:String
    },
    image:{
        type:String
    },
})


const myModel=mongoose.model("adminPanelCOllection",mySchema,"adMinPanel")

module.exports=myModel