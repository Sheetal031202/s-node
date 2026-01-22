const express = require("express")
require("./config/db.config")
// model require
const BookModel = require("./model/book.model")
const app = express()
// 1 multer path
const multer = require("multer")
const path = require("path")

// 8 delete karva
const fs = require("fs")


app.set("view engine", "ejs")
app.use(express.urlencoded())

//  7 css hoy to aa
// app.use(express.static(path.join(__dirname,"public")))

// 7 server ne mali jay upload folder etle aa
app.use("/uploads", express.static(path.join(__dirname, "uploads")))


app.get("/", async (req, res) => {
    // find method
    let allBooks = await BookModel.find()
    res.render("table", {
        allBooks
    })
})

app.get("/addFormPage", (req, res) => {
    res.render("home")
})

// 2 initialise
const myy = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}_${file.originalname}`)
    }
})

// 3
const uploadd = multer({ storage: myy })


// 4 res and req ni vache middel ware and 
// 5  form  ma encrypt ...image server sudhi pochadva
app.post("/addform", uploadd.single("book_image"), async (req, res) => {
    // console.log("Form Data:", req.body)
    // create method

    // 6 
    console.log(req.file)
    req.body.book_image = req.file.path


    const bookAdd = await BookModel.create(req.body)
    if (bookAdd) {
        console.log("Data added");
        res.redirect("/");
    }
    else {
        console.log("not added");
    }
})


// delete
app.get("/delete", async (req, res) => {
    const deleted = await BookModel.findByIdAndDelete(req.query.bookDel);
    console.log(deleted)

    // 9
    fs.unlink(deleted.book_image, (er) => { console.log("not deleted from upload folder") })

    if (deleted) {
        console.log(`ID ${req.query.bookDel} deleted successfully`);
    } else {
        console.log("No record found");
    }

    res.redirect("/");

});



// /edit
app.get("/edit/:editId", async (req, res) => {
    console.log(req.params.editId)



    const singleData = await BookModel.findById(req.params.editId)


    if (singleData) {
        res.render("edit", {
            singleData
        })
    }
    else {
        res.redirect("/")
    }
})

// 10 edit middle ware
// edit post
app.post("/editpost", uploadd.single("book_image"), async (req, res) => {
    // 11
    console.log(req.body)
    console.log(req.file)

    // 12
    if (req.file) {

        // 12.2 old image data get by id
        const updateImg = await BookModel.findById(req.body.id)

        // have again unlik juni image delete
        fs.unlink(updateImg.book_image, (err) => { console.log("new image not updated") })

        // new image no path add karvano
        req.body.book_image = req.file.path
        //  then again add
        const updated = await BookModel.findByIdAndUpdate(req.body.id, req.body, { new: true })

        if (updated) {
            console.log("updated")
            res.redirect("/")
        }
        else {
            console.log("not updated")
        }

    }
    // 12.1
    else {
        const updated = await BookModel.findByIdAndUpdate(req.body.id, req.body, { new: true })

        if (updated) {
            console.log("updated")
            res.redirect("/")
        }
        else {
            console.log("not updated")
        }
    }

})

app.listen(8000, (err) => {
    if (err) console.log("Error:", err)
    console.log("Server started on port 8000")
})
