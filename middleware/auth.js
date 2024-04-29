const User = require("../models/user");

const restrictToLoggedinUserOnly = async (req, res, next) => {
  try {
    const userId = req.cookies?.user_id;
    if (!userId) {
      return res.render("/user/login"); 
    }
    const user = await User.findById(userId);
    if (!user) return res.render("/user/login");
    req.user = user;
    next();
  } catch (err) {
    console.log("user_id is not found");
  }
};

module.exports = {restrictToLoggedinUserOnly}