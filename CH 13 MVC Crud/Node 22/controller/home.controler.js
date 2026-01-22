

// home page
 const homePage = (req, res) => {
  res.render("homePage")
}


const aboutPage=(req,res)=>{
    return res.render("aboutPage")
}
module.exports = { homePage,aboutPage }
