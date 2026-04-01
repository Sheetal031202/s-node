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
        phone:{
        type:String
    },
        password:{
        type:String
    },
    image:{
        type:String
    }

   

})

const myModel=mongoose.model("pracsitseAdminCollection",mySchema)
module.exports=myModel