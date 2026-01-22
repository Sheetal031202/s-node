const express = require("express")
require("./config/db.config")
const MyyModel = require("./model/book.model")
// model require
const BookModel = require("./model/book.model")

const app = express()


app.set("view engine", "ejs")

app.use(express.urlencoded())


app.get("/", async (req, res) => {

    const all = await MyyModel.find()

    res.render("table", {
        all
    })


})

app.get("/home", (req, res) => {
    res.render("home")
})

app.post("/addpost", (req, res) => {
    MyyModel.create(req.body)
        .then(() => console.log("data added"))
        .catch((e) => console.log("not added"))

    res.redirect("/")
})


// delete
app.get("/delete", async (req, res) => {

  let deleted=await MyyModel.findByIdAndDelete(req.query.deleteId)
    if (deleted) {
        console.log(`id ${req.query.deleteId} is deleted`)
    }
    else {
        console.log("not deleted")
    }


    res.redirect("/")

})
app.listen(8000, (err) => {
    if (err) console.log("Error:", err)
    console.log("Server started on port 8000")
})
