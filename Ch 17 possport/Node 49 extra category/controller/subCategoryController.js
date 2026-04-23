const catModel = require("../model/categoryModel")
const subModel = require("../model/subCategoryModel")


const addsubCategoryPage = async (req, res) => {
    // category ni value mate
    const allCat = await catModel.find()
    res.render("subCategory/addsubCategory", { allCat })
}

const addsubCategoryFun = async (req, res) => {
    try {
        const added = await subModel.create(req.body)
        console.log("sub", req.body)
                return res.redirect("/subCategory/addsubCategoryPage")

    } catch (error) {
        console.log("not added category  Error", error)
        return res.redirect("/subCategory/addsubCategoryPage")

    }
}

const viewsubCategoryPage = async (req, res) => {
    try {
        // populate ma je jagya par ref lakhyu etle ke schema ma je name chhe te aaya etle categoryName..
        // ane ema thi only categodyName and image joiye etle e two lakhya 
        const allSubCat = await subModel.find().populate("categoryName","categoryName categoryImage")
        console.log("all sub",allSubCat)
            res.render("subCategory/viewsubCategory",{allSubCat})
    }
    catch (error) {
        console.log("suv=b category view page  Error", error)
        return res.redirect("/subCategory/viewsubCategoryPage")

    }

}

const deleteSubCategory=async(req,res)=>{
    try{

        const deleted=await subModel.findByIdAndDelete(req.params.id)
        if(deleted){console.log("deleted subcategory")}
                return res.redirect("/subCategory/viewsubCategoryPage")

    }
    catch (error) {
        console.log("sub category deleted  Error", error)
        return res.redirect("/subCategory/viewsubCategoryPage")

    }
}

const editPage=async(req,res)=>{
    try {
        const data=await subModel.findById(req.params.id)
        return res.render("subCategory/editSubcategory",{data})

    }  catch (error) {
        console.log("sub category deleted  Error", error)
        return res.redirect("/subCategory/viewsubCategoryPage")

    }
}

const editFun=async(req,res)=>{
try{
    const updated=await subModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
            console.log("updated data", updated)
        return res.redirect("/subCategory/viewsubCategoryPage")


}
catch (error) {
        console.log("sub category updated  Error", error)
        return res.redirect("/subCategory/viewsubCategoryPage")

    }
}
module.exports = { addsubCategoryPage, addsubCategoryFun, viewsubCategoryPage ,deleteSubCategory,editPage,editFun}