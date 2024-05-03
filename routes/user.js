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
  homepage,
  newUser,
} = require("../controllers/user");

router.get("/login",login);

router.get("/signup",signup);

router.get("/signout",destroySession)

router.get("/homepage",passport.checkAuthentication,homepage)

router.post("/addUser",newUser)

// router.post("/create-session",postLogin);
// router.post("/create-session",createSession);
router.post("/create", postSignup);

router.post(
  "/create-session",
  passport.authenticate('local', { failureRedirect: "/user/login" }),
  createSession
);

module.exports = router;
