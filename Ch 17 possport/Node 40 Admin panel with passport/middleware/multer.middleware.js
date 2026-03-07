
// 1
const multer = require("multer")
const myStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/admin/")
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_ ${file.originalname}`)

    }
})
const myUpload = multer({ storage: myStorage })
module.exports=myUpload