const mongoose=require("mongoose")

const mySchema=mongoose.Schema({
    categoryName:{
        type:String
    },
    
    categoryImage:{
        type:String
    },
})


const myModel=mongoose.model("categoryAdminPanelCOllection",mySchema,)

module.exports=myModel