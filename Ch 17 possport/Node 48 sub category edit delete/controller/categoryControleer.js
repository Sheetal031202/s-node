const catModel = require("../model/categoryModel")
const fs = require("fs")
// add cat page open
const addCategoryPageShowFun = (req, res) => {
    res.render("category/addCat")
}
// add cat logic
const postCategory = async (req, res) => {
    try {
        req.body.categoryImage = req.file.path
        const addCat = await catModel.create(req.body)
        return res.redirect("/category/addCategoryPage")

    } catch (error) {
        console.log("category not added")
        console.log("category add Error", error)
        return res.redirect("/category/addCategoryPage")

    }
}

// view
const viewCategoryPageShowFun = async (req, res) => {
    try {
        let allCat = await catModel.find()
        return res.render("category/viewCategoryPage", { allCat })
    } catch (error) {
        console.log("category view Error", error)
        return res.redirect("/category/addCategoryPage")

    }
}

// delete
const deleteCatFun = async (req, res) => {
    try {
        let deleted = await catModel.findByIdAndDelete(req.params.id)
        fs.unlink(deleted.categoryImage, () => { })
        console.log("cat del", deleted)
        return res.redirect("/category/viewCategoryPage")
    } catch (error) {
        console.log("category not deleted")
        console.log("category deleted Error", error)
        return res.redirect("/category/viewCategoryPage")

    }

}

const editCategoryPage = async (req, res) => {
    try {
        let singleCat = await catModel.findById(req.params.id)
        return res.render("category/editCategoryPage", { singleCat })
    } catch (error) {
        console.log("category edit page  Error", error)
        return res.redirect("/category/viewCategoryPage")

    }
}

const postEditCategoryLogic = async (req, res) => {
    try {
       if(req.file){
let oldData=await catModel.findById(req.params.id)
fs.unlink(oldData.categoryImage,()=>{})
req.body.categoryImage=req.file.path;

  let updated = await catModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        console.log("ID:", req.params.id);
        console.log("BODY:", req.body);
                return res.redirect("/category/viewCategoryPage")
       }
       else{
         let updated = await catModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        console.log("ID:", req.params.id);
        console.log("BODY:", req.body);
                return res.redirect("/category/viewCategoryPage")

       }

    } catch (error) {
        console.log("category edit page  Error", error)
        return res.redirect("/category/editCategory")

    }
}

module.exports = {
    addCategoryPageShowFun, postCategory,
    viewCategoryPageShowFun, deleteCatFun,
    editCategoryPage, postEditCategoryLogic
}