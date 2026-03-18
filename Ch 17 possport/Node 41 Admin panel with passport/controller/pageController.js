const fs = require("fs")
const nodemailer = require("nodemailer")
// model require
const adminModel = require("../model/adminModel")



const adminLoginShowFun = async (req, res) => {
    const data = await adminModel.findById(req.cookies.adminId)

    if (req.cookies.adminId && data) {
        return res.redirect("/dashboardPage")
    }
    return res.render("auth/adminLoginPage", { data })
}


// log in
const adminLoginCheckedFun = async (req, res) => {
    try {
    //   3 cokkie nu badhu logic delete karyu..
        return res.redirect("/dashboardPage")


    } catch (error) {
        console.log("Server Error", error)
        res.redirect("/")
    }
}

const otpVerifyPageShowFun = (req, res) => {

    res.render("auth/otpVerifyPage")
}



const otpVerifyFun = (req, res) => {
    try {
        // console.log("client mail",req.body)
        // console.log("developer cookie mail",req.cookies)

        if (req.body.adminOtp !== req.cookies.otp) {
            console.log("otp not matched...")
            return res.redirect("/otpVerifyPage")
        }

        res.redirect("/forgetPassSetPage")

    } catch (error) {
        console.log("Server Error", error)
        res.redirect("/viewAdminPage", { allAdminData })
    }

}


const newPassSetFun = async (req, res) => {
    console.log(req.body)
    if (req.body.newPass !== req.body.confirmPass) {
        console.log("password not matched")
        return res.redirect("/forgetPassSetPage")
    }

    // console.log(req.cookies)
    const newPass = await adminModel.findByIdAndUpdate(req.cookies.id, { password: req.body.newPass }, { new: true })
    res.clearCookie('id')
    res.clearCookie('otp')

    if (newPass) {
        console.log("pass changed")
        res.redirect("/")
    }
    else {
        console.log("pass  not changed")
        res.redirect("/")
    }

}


const forgetPassSetPageShowFun = (req, res) => {
    res.render("auth/forgetPassSetPage")
}
// forget Pass otp send
const forgetPasswordVerifyEmailFun = async (req, res) => {

    try {
        const existAdminInDataBase = await adminModel.findOne(req.body)
        console.log("exist admin mail", req.body)

        if (!existAdminInDataBase) {
            return res.redirect("/")
        }

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

        console.log("info", info.messageId)
        // 4
        res.cookie("otp", otp)
        // 7.2
        res.cookie("id", existAdminInDataBase.id)
        return res.redirect("/otpVerifyPage")

    }
    catch (error) {
        console.log("Server Error", error)
        return res.redirect("/")
    }

}

// logout
const logOutFun = (req, res) => {
    res.clearCookie("adminId")
    res.redirect("/")
}


// profile page
const profilePageShowFun = async (req, res) => {
    try {
        const data = await adminModel.findById(req.cookies.adminId)
        if (req.cookies.adminId == undefined && !data) {
            return res.redirect("/")
        }
        return res.render("profile/profilePage", { data })
    }
    catch (error) {
        console.log("Server Error", error)
        res.redirect("/")
    }
}

// in dashboard
const changePasswordFun = async (req, res) => {

    const data = await adminModel.findById(req.cookies.adminId)
    //  console.log(data)
    if (req.cookies.adminId == undefined && !data) {
        return res.redirect("/")
    }

    return res.render("auth/changePasswordPage")
}

const changePasswordLogicFun = async (req, res) => {

    try {

        const data = await adminModel.findById(req.cookies.adminId)
        if (req.cookies.adminId == undefined && !data) {
            return res.redirect("/")
        }


        console.log("data", req.body)
        console.log("one", req.body.password)
        console.log("one", req.body.newPassword)
        console.log("one", req.body.confirmPassword)

        // current password math with database
        if (req.body.password != data.password) {
            console.log(" pass not mathch with data base")
            return res.redirect("/changePassword")

        }

        // new  and current pass same
        if (req.body.password == req.body.newPassword) {
            console.log("new and old  same")
            return res.redirect("/changePassword")

        }

        if (req.body.newPassword != req.body.confirmPassword) {
            console.log("new and confirm not  same")
            return res.redirect("/changePassword")

        }

        const passwordChange = await adminModel.findByIdAndUpdate(data._id, { password: req.body.newPassword }, { new: true })

        //cookie clea
        if (passwordChange) {
            console.log("change password")
            // 3
            res.clearCookie("adminId")

        }
        else {
            console.log("not changed password")

        }
        res.redirect("/dashboardPage")
    } catch (error) {
        console.log("not change password ", error)
        res.redirect("/changePassword")
    }
}
// dashborad show
const dashboardPageShowFun = async (req, res) => {
//   10

    return res.render("dashboardPage")
}

// Admin show
const addAdminPageShowFun = async (req, res) => {
    const data = await adminModel.findById(req.cookies.adminId)
    if (req.cookies.adminId == undefined && !data) {
        return res.redirect("/")
    }
    res.render("addAdminPage", { data })
}


// view all Admin
const viewAdminPageShowFun = async (req, res) => {
    try {
        const data = await adminModel.findById(req.cookies.adminId)

        if (req.cookies.adminId == undefined && !data) {
            return res.redirect("/")
        }



        let allAdminData = await adminModel.find()
        allAdminData = allAdminData.filter((e) => e.email != data.email)
        res.render("viewAdminPage", { allAdminData, data })
    } catch (error) {
        console.log("Server Error", error)
        res.redirect("/viewAdminPage", { allAdminData })
    }
}

// add admin logic
const addAdminLogicFun = async (req, res) => {
    req.body.image = req.file.path

    try {
        // console.log(req.body)
        // console.log(req.file)

        let added = await adminModel.create(req.body)
        if (added) { console.log("admin added") }
        else { console.log("admin not added") }
        res.redirect("/addAdminPage")


    } catch (error) {
        console.log("Server Error", error)
        res.redirect("/addAdminPage")
    }

}

// delete
const deleteAdminFun = async (req, res) => {
    // console.log("DELETED id..", req.query.deleteId)
    try {


        const data = await adminModel.findById(req.cookies.adminId)

        if (req.cookies.adminId == undefined && !data) {
            return res.redirect("/")
        }
        const deleted = await adminModel.findByIdAndDelete(req.query.deleteId)
        // console.log("DElete Dtaa", deleted)
        if (deleted) {
            fs.unlink(deleted.image, () => { })
            console.log("admin deleted")
        }
        else { console.log("admin not deleted") }
        res.redirect("/viewAdminPage")


    } catch (error) {
        console.log("Server Error", error)
        res.redirect("/viewAdminPage")
    }
}

// show edit page
const editAdminPageShowFun = async (req, res) => {
    try {
        const data = await adminModel.findById(req.cookies.adminId)

        if (req.cookies.adminId == undefined && !data) {
            return res.redirect("/")
        }
        const singleData = await adminModel.findById(req.params.editId)
        console.log("Edit ID", req.params.editId)
        console.log("Edit Data", singleData)
        res.render("editAdminPage", { singleData, data })
    }

    catch (error) {
        console.log("Server Error", error)
        res.redirect("/viewAdminPage")
    }
}

// edit post  logic
const editAdminLogicFun = async (req, res) => {
    try {


        const data = await adminModel.findById(req.cookies.adminId)

        if (req.cookies.adminId == undefined && !data) {
            return res.redirect("/")
        }


        console.log(req.params.iid)

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




module.exports = {
    adminLoginShowFun, forgetPassSetPageShowFun, newPassSetFun, 
    otpVerifyPageShowFun, otpVerifyFun, adminLoginCheckedFun, logOutFun, changePasswordFun, forgetPasswordVerifyEmailFun, changePasswordLogicFun, profilePageShowFun,
    dashboardPageShowFun, addAdminPageShowFun, viewAdminPageShowFun,

    addAdminLogicFun, deleteAdminFun, editAdminPageShowFun, editAdminLogicFun
}