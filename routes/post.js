const express = require('express')
const router = express.Router()
const {create, displayPost} = require("../controllers/post");

router.get("/",displayPost)
router.post("/create",create);

module.exports = router;