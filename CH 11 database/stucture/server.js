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

app.get("/deleteBook",async (req,res)=>{
    // method
   let deleted=await BookModel.findByIdAndDelete(req.query.bookDel)

   if(deleted){
    console.log("deleted")
   }
   else{
    console.log("not deleted")
   }
       res.redirect("/")

})



app.listen(8000, (err) => {
    if (err) console.log("Error:", err)
    console.log("Server started on port 8000")
})
