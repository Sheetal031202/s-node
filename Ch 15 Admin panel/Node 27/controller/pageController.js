const dashboardPageShowFun=(req,res)=>{
res.render("dashboardPage")
}


const addAdminPageShowFun=(req,res)=>{
res.render("addAdminPage")
}

const viewAdminPageShowFun=(req,res)=>{
res.render("viewAdminPage")
}

module.exports={dashboardPageShowFun,addAdminPageShowFun,viewAdminPageShowFun}