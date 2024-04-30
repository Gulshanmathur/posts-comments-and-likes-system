const express = require("express");
const passport = require("passport");
const router = express.Router();

const {
  signup,
  login,
  postLogin,
  postSignup,
  createSession,
  destroySession,
} = require("../controllers/user");

router.get("/login", login);

router.get("/signup", signup);

router.get("/signout",destroySession)

// router.post("/create-session",postLogin);
// router.post("/create-session",createSession);
router.post("/create", postSignup);

router.post(
  "/create-session",
  passport.authenticate('local', { failureRedirect: "/user/login" }),
  createSession
);

module.exports = router;
