const User = require("./models/user");
const userAuthentication = async(req,res,next)=>{
    try {
        if (req.cookies.user_id) {
          const user = await User.findById(req.cookies.user_id);
          if (user)
            return res.render("home", {
              title: "Profile Details",
              user: user,
              contactlist:contact
            });
            next()
        } else res.render("/user/login");
      } catch (err) {
        console.log("user_id is not found");
      }
}