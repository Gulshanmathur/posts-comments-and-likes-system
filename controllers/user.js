const User = require("../models/user");
const signup = (req, res) => {
  return res.render("signup");
};

const login = (req, res) => {
  return res.render("login");
};

const postLogin = async (req, res) => {
  try {
    const body = req.body;  
    const user = await User.findOne(body);
    res.cookie("user_id",user._id);
    if (user) return res.redirect("/");
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
      console.log(newUser);
      return res.redirect("/user/login");
    } else return res.redirect("back");
  } catch (error) {
    console.log("Error finding user", error);
  }
};

module.exports = { signup, login, postLogin, postSignup };
