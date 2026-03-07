const mongoose=require("mongoose")

const adminSchema=mongoose.Schema({
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
        type:Number
    },
    contact:{
        type:String
    },
    gender:{
        type:String
    },
    city:{
        type:String
    },
    hobby:{
        type:Array
    },
    image:{
        type:String
    }

})


const adminModel=mongoose.model("stuProjectAdminCollection",adminSchema,"stuPrAdminCollection")
module.exports=adminModel