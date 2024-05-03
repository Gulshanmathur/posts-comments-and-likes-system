const express = require('express')
const router = express.Router()
const passport = require('passport');
const { create } = require('../controllers/comments');

router.post("/create",passport.checkAuthentication,create);

module.exports = router;