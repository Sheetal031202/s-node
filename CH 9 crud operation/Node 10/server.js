
// 1
const express=require("express")
// 2
const app=express()


// 7 but aane kevu pdse ke view nu ejs enjine ame use kariye chiiye so
// agar pub enjige use karti hot to= view enjine="pub"
app.set("view engine","ejs")

// 10
const allUsers=[{
    id:101,
    name:"sheetal",
    email:"s@hmail.com",
    password:123456,
    phone:7894561231,
    adress:"surat"
},
{
    id:102,
    name:"raj",
    email:"r@hmail.com",
    password:123456,
    phone:7894561231,
    adress:"surat"
},
{
    id:103,
    name:"sameer",
    email:"s@hmail.com",
    password:123456,
    phone:7894561231,
    adress:"surat"
}]

// 3
app.get("/",(req,res)=>{
    // 5 view ma home ejs...
    // 6 aaya render karvani
    // 8 isadmin,name home page par show karayu
    // 9 home page ma table
    res.render("home",{
        isAdmin:true,
        name:"sheetal",
        // 11
        // 12 home page ma map thi badha data print karvana
        users:allUsers
    })
})


// 4
app.listen(8000,(e)=>{
    if(e){
          console.log("server ma error")
          return 

    }
    console.log("server start")
})