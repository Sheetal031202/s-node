// require admin Model
const adminModel = require("../model/adminModel")
const nodemailer = require("nodemailer")

const { all } = require("../routes/adminRoute")

// show dashboard page
const dashboardPageShowFun = async (req, res) => {
    const adminData = await adminModel.findById(req.cookies.adminId)

    if (req.cookies.adminId == undefined && !adminData) {
        return res.redirect("/")
    }
    return res.render("admin/dashboardPage", { adminData })



}

// show dashboard page
const addAdminPageShowFun = async (req, res) => {
    const adminData = await adminModel.findById(req.cookies.adminId)

    if (req.cookies.adminId == undefined && !adminData) {
        return res.redirect("/")

    }
    res.render("admin/addAdminPage", { adminData })
}
// add admin Data logic
const addAdminDataLogicFun = async (req, res) => {

    try {
        // console.log("Data add", req.body)
        req.body.image = req.file.path
        const added = await adminModel.create(req.body)
        if (added) { console.log(" admin data added") }
        else { console.log(" admin data not added") }
        res.redirect("/addAdminPage")

    } catch (error) {
        console.log("Error", error)
        res.redirect("/")
    }
}


// view admin page show
const viewAdminPageShowFun = async (req, res) => {
    try {

        const adminData = await adminModel.findById(req.cookies.adminId)

        if (req.cookies.adminId == undefined && !adminData) {
            return res.redirect("/")

        }

        const allAdminData = await adminModel.find()
        // console.log("All Admin Data", allAdminData)
        res.render("admin/viewAdminPage", { allAdminData, adminData })

    }
    catch (error) {
        console.log("Error", error)
        res.render("/")
    }
}

// delete admin
const deleteAdminLogicFun = async (req, res) => {
    try {
        const deletedAdmin = await adminModel.findByIdAndDelete(req.query.deleteId)
        console.log("deleta Admin id", req.query.deleteId)
        if (deletedAdmin) {
            fs.unlink(deletedAdmin.image, () => { })

            console.log(" admin data deleted")
        }
        else { console.log("admin data  not deleted") }
        res.redirect("/viewAdminPage")

    }
    catch (error) {
        console.log("Error", error)
        res.redirect("/viewAdminPage")
    }
}


// edit page show 
const editAdminPageShowFun = async (req, res) => {


    const adminData = await adminModel.findById(req.cookies.adminId)

    if (req.cookies.adminId == undefined && !adminData) {
        return res.redirect("/")

    }
    // console.log("Edit Admin Id", req.params.editId)
    let data = await adminModel.findById(req.params.editId)
    // console.log("Data edit one", data)
    res.render("admin/editAdminPage", { data, adminData })
}


// edit logic

const editAdminDataLogicFun = async (req, res) => {
    try {
        console.log("params", req.params.iid)
        console.log("body", req.body)

        if (req.file) {
            // save new image path
            req.body.image = req.file.path;
            // get old data first
            let oldData = await adminModel.findById(req.params.iid);
            // update record
            let updated = await adminModel.findByIdAndUpdate(req.params.iid, req.body, { new: true });
            if (updated) {
                if (oldData.image) {
                    fs.unlink(oldData.image, (err) => { });
                }
                console.log("admin updated with image");
            }

        } else {

            let updated = await adminModel.findByIdAndUpdate(req.params.iid, req.body, { new: true });
            console.log("admin updated without image", updated);


            if (updated) {
                console.log("admin updated without image");
            }

        }

        // 1 logic
        if (req.params.iid == req.cookies.adminId) {
            return res.redirect("/profilePage");
        }
        else {
            return res.redirect("/viewAdminPage");

        }

    } catch (error) {
        console.log("Server Error", error);
        res.redirect("/viewAdminPage");
    }
};

// -----------------------------------------

// profle show page
const profilePageShowFun = async (req, res) => {
    try {
        const adminData = await adminModel.findById(req.cookies.adminId)

        if (req.cookies.adminId == undefined && !adminData) {
            return res.redirect("/")

        }



        return res.render("admin/adminProfilePage", { adminData })
    }
    catch (error) {
        console.log("Server Error", error)
        res.redirect("/")
    }
}

// change Password page show
const changePasswordPageShowFun = async (req, res) => {
    try {
        const adminData = await adminModel.findById(req.cookies.adminId)

        if (req.cookies.adminId == undefined && !adminData) {
            return res.redirect("/")

        }



        return res.render("admin/changePasswordPage", { adminData })
    }
    catch (error) {
        console.log("Server Error", error)
        res.redirect("/")
    }
}

// logic
const changeAdminPasswordLogicFun = async (req, res) => {
    try {

        const adminData = await adminModel.findById(req.cookies.adminId)
        if (req.cookies.adminId == undefined && !adminData) { return res.redirect("/") }

        // console.log("password",req.body)
        //    console.log(`main : ${req.body.password},new  : ${req.body.newPassword},confirm : ${req.body.confirmPassword}`)

        // current password match
        if (adminData.password != req.body.password) { console.log("incorect password") }

        // old and new same
        if (adminData.password == req.body.newPassword) { console.log("old and new same") }

        // confirm mismatch
        if (req.body.newPassword != req.body.confirmPassword) { console.log("not same password") }

        const changed = await adminModel.findByIdAndUpdate(adminData._id, { password: req.body.newPassword }, { new: true })

        //cookie clea
        if (changed) {
            console.log("change password")
            // 3
            res.clearCookie("adminId")

        }
        else {
            console.log("not changed password")

        }
        res.redirect("/changePasswordPage")


    } catch (error) {
        console.log("not change password", error);
        res.redirect("/changePasswordPage");
    }
};


// -----------------------------------------------------------
// log in page show
const logInPageShowFun = async (req, res) => {
    try {


        return res.render("auth/loginPage")
    }
    catch (error) {
        console.log("Server Error", error)
        res.redirect("/")
    }
}

// admin Login Checked Logic Fun
const adminLoginCheckedLogicFun = async (req, res) => {
    // console.log(req.body)
    try {
        const adminData = await adminModel.findOne({ email: req.body.email })
        console.log("Admin Login Data", adminData)
        if (!adminData) {
            console.log("Admin data not found")
            return res.redirect("/")
        }
        if (adminData.password != req.body.password) {
            console.log("password data not found")
            return res.redirect("/")
        }

        res.cookie("adminId", adminData._id)
        return res.redirect("/dashboardPage")

    }

    catch (error) {
        console.log("Server Error", error);
        res.redirect("/viewAdminPage");
    }
}

// logOut Function
const logOutLogicFun = async (req, res) => {
    const adminData = await adminModel.findById(req.cookies.adminId)

    if (req.cookies.adminId == undefined && !adminData) {
        return res.redirect("/")
    }
    res.clearCookie("adminId")
    res.redirect("/")
}


// opt page for forget password
const forgetPassEmailPageShowFun =  (req, res) => {
   
    res.render("auth/forgetPassEmailPage")
}

const forgetPassSendOtpLogicFun = async (req, res) => {
    try {

      

        // console.log("email",req.body)

        const findEmail = await adminModel.findOne(req.body)
        // console.log("email",findEmail)

        if (!findEmail) { return res.redirect("/") }

        // mail
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "sheetaldave0312@gmail.com",
                pass: "dvxqmcmiwnddxdca"
            }
        })
        const otp = Math.floor(100000 + Math.random() * 90000)
        const info = await transport.sendMail({
            from: `"Admin Panel" <sheetaldave0312@gmail.com>`,
            to: req.body.email,
            subject: "OTP Verification",
            html: `
  <div style="max-width:600px;margin:0 auto;font-family:Arial,Helvetica,sans-serif;background:#f5f6fa;padding:20px;">
    
    <div style="background:#ffffff;border-radius:8px;padding:30px;text-align:center;">
      
      <h2 style="color:#333;margin-bottom:10px;">OTP Verification</h2>
      
      <p style="color:#555;font-size:14px;">
        Use the OTP below to complete your verification process.
      </p>

      <div style="margin:30px 0;">
        <span style="
          display:inline-block;
          background:#4CAF50;
          color:#ffffff;
          font-size:28px;
          letter-spacing:6px;
          padding:12px 30px;
          border-radius:6px;
          font-weight:bold;">
          ${otp}
        </span>
      </div>

      <p style="color:#777;font-size:13px;">
        This OTP is valid for <b>5 minutes</b>.
      </p>

      <p style="color:#777;font-size:13px;">
        If you did not request this, please ignore this email.
      </p>

      <hr style="border:none;border-top:1px solid #eee;margin:25px 0;">

      <p style="color:#999;font-size:12px;">
        © 2026 Admin Panel. All rights reserved.
      </p>

    </div>
  </div>
  `
        });




        res.cookie("id", findEmail.id)
        res.cookie("otp", otp)
        res.redirect("/forgetPasschangePasswordPage")
    }catch (error) {
        console.log("error", error);
        res.redirect("/");
    }
}

// show page formget pass chamged pass page
const forgetPasschangePasswordPageShowFun = (req, res) => {
    
    res.render("auth/forgetPasschangePasswordPage")
}
// logic 
const changeForgetPassLogic = async (req, res) => {
    console.log("data", req.body)


    try {
       

        if (req.body.otp != req.cookies.otp) {
            console.log("otp mismatch")
            return res.redirect("/forgetPasschangePasswordPage")

        }

        if (req.body.newPassword != req.body.confirmPassword) {
            console.log("Make sure both password is same")
            return res.redirect("/forgetPasschangePasswordPage")

        }

        const newPass = await adminModel.findByIdAndUpdate(req.cookies.id, { password: req.body.newPass }, { new: true })
        res.clearCookie("id")
        res.clearCookie("otp")

        if (newPass) {
            console.log("pass changed")
            res.redirect("/")
        }
        else {
            console.log("pass  not changed")
            res.redirect("/")
        }
    }
catch (error) {
        console.log("error", error);
        res.redirect("/");
    }

}





module.exports = {
    dashboardPageShowFun,
    addAdminPageShowFun, addAdminDataLogicFun,
    viewAdminPageShowFun,
    deleteAdminLogicFun,
    editAdminPageShowFun, editAdminDataLogicFun,
    // ------
    profilePageShowFun, changePasswordPageShowFun, changeAdminPasswordLogicFun,
    logInPageShowFun, adminLoginCheckedLogicFun,
    logOutLogicFun,
    forgetPassEmailPageShowFun, forgetPassSendOtpLogicFun,
    forgetPasschangePasswordPageShowFun, changeForgetPassLogic


}