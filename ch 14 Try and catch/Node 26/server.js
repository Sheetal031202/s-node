     const express = require("express")
     const app = express()
     // database required
     require("./config/db.json")
     const PORT = 8000
     app.use(express.urlencoded())

     app.set("view engine", "ejs")
     app.use("/", require("./routes/index"))

     app.listen(PORT, (e) => { 
     if(e){
          console.log("server connected...",e)

     }
     console.log("server connected...")
     })