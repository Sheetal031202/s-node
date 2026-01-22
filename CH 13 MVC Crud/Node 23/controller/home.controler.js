

// home page
 const homePage = (req, res) => {
  res.render("homePage")
}


const aboutPage=(req,res)=>{
    return res.render("aboutPage")
}

const contactPage=(req,res)=>{
    return res.render("contactpage")
}
module.exports = { homePage,aboutPage,contactPage }
