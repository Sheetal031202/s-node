const mongoose = require("mongoose")

const empSchema = new mongoose.Schema({
    emp_name: {
        type: String,
        required: true
    },
    emp_email: {
        type: String,
        required: true
    },
    emp_password: {
        type: String,
        required: true
    },
    emp_gender: {
        type: String,
        required: true
    },
    emp_salary: {
        type: Number,
        required: true
    },
    emp_hobby: {
        type: [String],   // array of strings
        required: true
    },
    emp_role: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("empCollection", empSchema)
