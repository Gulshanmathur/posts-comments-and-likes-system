const express = require('express')
const router = express.Router()
const {create, displayPost} = require("../controllers/post");
const passport = require('passport');

router.get("/displayPost",displayPost)
router.post("/createPost",passport.checkAuthentication,create);

module.exports = router;