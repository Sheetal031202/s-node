const category = require("../model/categoryModel")
const subCategory = require("../model/subCategoryModel")

const showAddExtraCategoryPage = async(req, res) => {
    const allCat =await  category.find()
    const allSubCat =await subCategory.find()
    res.render("extraCategory/addExtraCategory",{allCat,allSubCat})
}

const showViewExtraCategoryPage = () => {

}

module.exports = {
    showAddExtraCategoryPage, showViewExtraCategoryPage
}