const catModel=require("../model/categoryModel")

// add cat page open
const addCategoryPageShowFun = (req, res) => {
    res.render("category/addCat")
}
// add cat logic
const postCategory = async(req, res) => {
try {
    req.body.categoryImage=req.file.path
    const addCat=await catModel.create(req.body)
 return   res.redirect("/category/addCategoryPage")
    
} catch (error) {
    console.log("category not added")
    console.log("category add Error",error)
     return   res.redirect("/category/addCategoryPage")

}
}

const viewCategoryPageShowFun=(req, res) => {
    res.render("category/viewCategoryPage")
}

module.exports = { addCategoryPageShowFun,postCategory,
    viewCategoryPageShowFun }