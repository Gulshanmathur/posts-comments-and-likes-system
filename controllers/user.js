const User = require("../models/user");
const contact = [
  {
    name: "Tony",
    phone: +918342342,
  },
  {
    name: "Addy",
    phone: +918344566,
  },
  {
    name: "June",
    phone: +1834111145,
  },
];
const signup = (req, res) => {
  if (req.isAuthenticated()) return res.redirect("/post/displayPost");  //"/user/homepage"
  return res.render("signup");
};

const login = (req, res) => {
  if (req.isAuthenticated()) return res.redirect("/post/displayPost");       //"/user/homepage"
  return res.render("login");
};

const homepage = (req, res) => {
    // app.get("/",restrictToLoggedinUserOnly,(req, res)
    return res.render("home", { 
      title: "Profile Details", 
      user: req.user,
      contactlist: contact,
    });
  };

const newUser = (req, res) => { 
  const { inputField, phoneNum } = req.body;
  contact.push({
    name: inputField,
    phone: +phoneNum,
  });
  return res.redirect("back"); // just shortCut to get back data on same page
}

const postLogin = async (req, res) => {
  try {
    const body = req.body;
    const user = await User.findOne(body);
    if (user) return res.redirect("/post/displayPost");  //"/user/homepage"
    else return res.redirect("back");
  } catch (err) {
    console.log("error 402, try again");
  }
};

const postSignup = async (req, res) => {
  if (req.body.password != req.body.confirmPassword)
    return res.redirect("back");
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      const newUser = await User.create(req.body);
      return res.redirect("/user/login");
    } else return res.redirect("back");
  } catch (error) {
    console.log("Error finding user", error);
  }
};

const createSession = (req, res) => {
  return res.redirect("/post/displayPost");         //"/user/homepage"
};

const destroySession = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    } 
    res.redirect("/user/login");                //"/user/homepage"
  });
};

module.exports = {
  signup,
  login,
  homepage,
  postLogin,
  postSignup,
  createSession,
  destroySession,
  newUser,
};
