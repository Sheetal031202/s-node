const mongoose = require("mongoose")
const URL = "mongodb://localhost:27017/aa"
mongoose.connect(URL)
    .then(() => { console.log("database connected") })
    .catch((e) => { console.log("not connected", e) })

    module.exports=mongoose