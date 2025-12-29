const express = require("express")
require("./config/db.config")

// model require
const BookModel = require("./model/book.model")

const app = express()


app.set("view engine", "ejs")

app.use(express.urlencoded())

app.get("/", (req, res) => {
    res.render("home")
})

// app.post("/addform", (req, res) => {
//     // console.log("Form Data:", req.body)
//     BookModel.create(req.body)
//         .then(() => {
//             console.log("Data added");
//         })
//         .catch((e) => {
//             console.log("Data not added", e);
//         });
//     res.redirect("/");
// })

// or 

app.post("/addform", async (req, res) => {
    // console.log("Form Data:", req.body)
    const bookAdd = await BookModel.create(req.body)
    if (bookAdd) {
        console.log("Data added");
            res.redirect("/");

    }
    else {
        console.log("not added");
    }
})

app.listen(8000, (err) => {
    if (err) console.log("Error:", err)
    console.log("Server started on port 8000")
})
