

const express = require("express")
const { homePage, aboutPage } = require("../controller/home.controler")
const route = express.Router()


route.get("/", homePage)
route.get("/about",aboutPage)

module.exports = route
