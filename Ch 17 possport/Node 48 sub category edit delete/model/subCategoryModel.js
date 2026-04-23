const mongooose=require("mongoose")

const subSchema=mongooose.Schema({
    subCategoryName:{
        type:String
    },
    categoryName:{
        type:mongooose.Schema.Types.ObjectId,
        ref:"categoryAdminPanelCOllection"
    }
})

const subModel=mongooose.model("subModel",subSchema)
module.exports=subModel