const model = require("../model/myModel")

const homePageShow = async (req, res) => {
    const data=await model.find()
    console.log("home page data",data)
    res.render("homePage",{data})
}
// addPageShow

const addPageShow = async (req, res) => {
  
    res.render("addPage")
}
const addSuccess = async (req, res) => {
    try {
        const added = await model.create(req.body)

        console.log("product added", added)

        return res.redirect("/addPage")   // ✅ only redirect

    } catch (error) {
        console.log("Error:", error)

        return res.send("Error adding product")
    }
}

const viewAllData = async (req, res) => {
    try {
        const allData = await model.find()

        console.log("All Data:", allData)

        return res.status(200).json({
            success: true,
            message: "All data is here",
            data: allData
        })

    } catch (error) {
        console.log("Error fetching data:", error)

        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        })
    }
}

const editPageShow=async(req,res)=>{
    const editt=await model.findOne(req.params)
    console.log("edit Data got",editt)
    res.render("/edit",{editt})
}

const editDataFun = async (req, res) => {
    try {
        const updated = await model.findByIdAndUpdate(
            req.params.id,   // ✅ only ID
            req.body,        // ✅ new data
            { new: true }    // ✅ return updated data
        )

        if (updated) {
            console.log("updated data", updated)

            return res.status(200).json({
                success: true,
                message: "Product updated successfully",
                data: updated   // ❗ not "added"
            })
        } else {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

    } catch (error) {
        console.log("Error in updated product:", error)

        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        })
    }
}

const deleteFun=async(req,res)=>{
     try {
        const deleted = await model.findByIdAndDelete(req.params.id)

        if (deleted) {
            console.log("deleted data", deleted)

            return res.status(200).json({
                success: true,
                message: "Product deleted successfully",
            })
        } else {
            return res.status(404).json({
                success: false,
                message: "Product not deleted"
            })
        }

    } catch (error) {
        console.log("Error in deleted product:", error)

        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        })
    }
}

module.exports = {
    homePageShow,
    addPageShow,addSuccess,
    viewAllData,
    editPageShow, editDataFun,
    deleteFun
}