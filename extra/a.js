const express = require("express")
const fs = require("fs")

const app = express()

app.get("/", (req, res) => {
    fs.readFile("./home.html", (err, result) => {
        if (err) return res.send("Error loading home file")
        res.end(result)
    })
})

app.get("/about", (req, res) => {
    fs.readFile("./about.html", (err, result) => {
        if (err) return res.send("Error loading about file")
        res.end(result)
    })
})

app.get("/contact", (req, res) => {
    fs.readFile("./contact.html", (err, result) => {
        if (err) return res.send("Error loading contact file")
        res.end(result)
    })
})

app.listen(8000, () => {
    console.log("Server started at http://localhost:8000")
})
