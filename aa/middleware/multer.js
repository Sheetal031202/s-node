const multer = require("multer")

const myStoorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/")
    },
    filename:(req,file,cb)=>{
cb(null,`${Date.now()}_ ${file.originalname}`)
    }
})

const myUpload=multer({storage:myStoorage})
module.exports=myUpload

