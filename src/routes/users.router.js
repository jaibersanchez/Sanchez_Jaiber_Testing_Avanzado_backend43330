const {Router} = require("express")
const passport = require("passport")
const { passportCall } = require("../config/passportCall.js")
const userController = require("../controllers/user.controller.js")
const router= Router()


router.post("/login", userController.login )

router.post("/register", userController.register)

router.get("/logout", userController.logout)

router.post("/forgotPassword", userController.forgotpassword)

router.post("/resetPassword", userController.resetPassword)

router.get("/premium/:uid", userController.changeRole)


router.get("/github", passport.authenticate("github", {scope:["user:email"]}))
router.get("/githubcallback",passport.authenticate("github",{failureRedirect:"/api/session/login"}), async(req,res)=>{
    req.session.user = req.user 
    res.redirect("/")
})

router.get("/current", passportCall("current", {session: false}),(req,res)=>{
    res.status(200).send({status: "success", payload: req.user})
})

module.exports= router