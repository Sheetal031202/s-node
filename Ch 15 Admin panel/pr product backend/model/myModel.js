const mongoose = require("mongoose")

const mySchema = mongoose.Schema({
    name: {
        type: String
    },
    price: {
        type: String
    },
    stock: {
        type: String
    },
     category: {
        type: String
    }

})

const myModel = mongoose.model("product", mySchema)
module.exports = myModel