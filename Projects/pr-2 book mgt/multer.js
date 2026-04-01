const multer=require("multer")


const myStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
cb(null,"uploads/")
    },
    filename:(req,file,cb)=>{
cb(null,`${Date.now()}_${file.originalname}`)

    }
})

const upload=multer({storage:myStorage})
module.exports=upload