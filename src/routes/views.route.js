const {Router} = require("express")
const { authorization } = require("../config/authorizationjwtRole.js");
const { passportCall } = require("../config/passportCall.js");
const viewsController = require("../controllers/views.controller.js");
const router = Router()

router.get("/", viewsController.getProducts)

router.get("/realTimeProducts",passportCall("current", {session: false}),authorization(["admin", "premium"]), viewsController.getRealTimeProducts)

router.get("/carts/:cid", viewsController.getCartById)

router.get("/chat", passportCall("current", {session: false}), authorization("user") , (req, res)=>{
    res.render("chat", {})
})

router.get("/api/session/login", (req,res)=>{
    res.render("login", {})
})

router.get("/api/session/register", (req,res)=>{
    res.render("registerForm", {})
})

router.get('/api/session/forgotPassword', (req,res)=>{
    res.render('forgotPassword',{})
})

router.get('/api/session/resetPassword', viewsController.resetPasswordpage)

module.exports = router