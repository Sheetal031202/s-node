const mongoose = require("mongoose")

const Url = "mongodb://127.0.0.1:27017/MyData"

mongoose.connect(Url)
    .then(() => {
        console.log("Database connected")
    })
    .catch((err) => {
        console.log("Database not connected")
        console.error(err)
    })

module.exports = mongoose
