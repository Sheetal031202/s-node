

const express = require("express")
const { homePage, aboutPage ,contactPage} = require("../controller/home.controler")
const route = express.Router()


route.get("/", homePage)
route.get("/about",aboutPage)
route.get("/contact",contactPage)

route.use("/employee",require("./emp.route"))

module.exports = route
