// const mongoose = require("mongoose")

// const bookSchema = new mongoose.Schema({
//     book_name: {
//         type: String,
//         required: true
//     },
//     book_author: {
//         type: String,
//         required: true
//     },
//     book_price: {
//         type: Number,
//         required: true
//     },
//     book_lang: {
//         type: String,
//         required: true
//     },
//     book_image: {
//         type: String,
//         required: true
//     }
// })

// // model(modelName, schema, collectionName)
// const BookModel = mongoose.model("Book", bookSchema, "bookCollection")

// module.exports = BookModel

// -------------------------------------------------------------------------------------
const mongoose = require("mongoose")


const MySchema = mongoose.Schema([
    {
        book_name: {
            type: String
        },
        book_price: {
            type: String
        }, book_image: {
            type: String
        }
    }
])


const myModel=mongoose.model("extraModel",MySchema,"extraCollection")

module.exports=(myModel)