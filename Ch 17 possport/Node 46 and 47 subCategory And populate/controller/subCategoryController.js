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
    } catch (error) {
        console.log("not added category  Error", error)
        return res.redirect("/subCategory/addsubCategoryPage")

    }
}

const viewsubCategoryPage = async (req, res) => {
    try {
        const allSubCat = await subModel.find().populate("categoryName","categoryName categoryImage")
        console.log("all sub",allSubCat)
            res.render("subCategory/viewsubCategory",{allSubCat})
    }
    catch (error) {
        console.log("suv=b category view page  Error", error)
        return res.redirect("/subCategory/viewsubCategoryPage")

    }

}

module.exports = { addsubCategoryPage, addsubCategoryFun, viewsubCategoryPage }