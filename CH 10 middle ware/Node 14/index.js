const express = require("express")
const app = express()
const PORT = 8000

app.set("view engine", "ejs")

// // 1 middle ware
// direct call back funtion bhi chale
// // ---------------------------------------------------------------------------
// function middleware(req,res,next){
//     // 1.1 responce mokli didhu to next nay chalse
//     // res.end("hi i m 1st middleware")

//     // or next kari toj aagal nu home page aavse nahitar nay aave 
//     console.log("hi i m 1st middleware")
//     next()
// }
// app.use(middleware)
// app.get("/",(req,res)=>{
//      return res.render("home")
// })
// // ....................................................................................................................

// // 2 middle ware
// // ---------------------------------------------------------------------------
// function middleware(req,res,next){
//        console.log("hi i m 2nd  for about middleware")
//     //    aama only /about nu page open karsu toj aavse ..home page par nay aave
//     next()
// }
// app.get("/",(req,res)=>{
//      return res.render("home")
// })
// app.get("/about",middleware,(req,res)=>{
//      return res.render("about")
// })

// // ....................................................................................................................




// 3 middle ware
// aama about ma ?age=18 thi up hase toj about khulse nahitar not found nu page aavse..
// badha page ma rakhvu hoy to 1st ni jem app.use(middleware kari devanu)
// ---------------------------------------------------------------------------
function middleware(req, res, next) {

    if (req.query.age >= 18) {
        next()
    }
    else{
        res.render("notfound")
    }

}
app.get("/", (req, res) => {
    return res.render("home")
})
app.get("/about", middleware, (req, res) => {
    return res.render("about")
})

// ....................................................................................................................


app.listen(PORT, (err) => {
    if (err) {
        console.log("err")
        return
    }

    console.log("startedd")

})