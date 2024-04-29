const express = require('express')

const router = express.Router()

const {signup,login, postLogin, postSignup} = require("../controllers/user");

router.get("/login",login);
 
router.get("/signup",signup);

router.post("/create-session",postLogin);
router.post("/create",postSignup);

module.exports = router;
