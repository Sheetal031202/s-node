const express = require("express")
require("./config/db.config")

// model require
const BookModel = require("./model/book.model")

const app = express()


app.set("view engine", "ejs")

app.use(express.urlencoded())



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


app.post("/addform", async (req, res) => {
    // console.log("Form Data:", req.body)
    // create method
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


// edit post
app.post("/editpost",async (req,res)=>{

const updated=await BookModel.findByIdAndUpdate(req.body.id,req.body,{new:true})

    if(updated){
        console.log("updated")
        res.redirect("/")
    }
    else{
        console.log("not updated")
    }
})

app.listen(8000, (err) => {
    if (err) console.log("Error:", err)
    console.log("Server started on port 8000")
})
