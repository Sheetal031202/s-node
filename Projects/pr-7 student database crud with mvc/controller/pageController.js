// home Page
const homePageFun = (req, res) => {
    res.render("homePage")
}

// about show
const aboutPageFun=(req,res)=>{
res.render("aboutPage")
}

// contact
const contactPageFun=(req,res)=>{
    res.render("contactPage")
}


module.exports={homePageFun,aboutPageFun,contactPageFun}