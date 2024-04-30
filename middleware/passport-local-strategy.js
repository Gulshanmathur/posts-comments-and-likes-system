const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");

passport.use("local",
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      const user = await User.findOne({email});
      console.log(user);
      if (!user || user.password != password)
        return done(null, false, {
          message: "Incorrect password or maybe user not exits",
        });
        return done(null,user);
    }
  )
);

//responsible for converting a user object (typically retrieved from the database)
// into a representation that can be stored in a session.
passport.serializeUser((user,done)=>{
    done(null,user.id)
})

//On subsequent requests, responsible for retrieving the full user
//  object from the database using the serialized information.
passport.deserializeUser((id,done)=>{
    User.findById(id)
    .then((user)=>done(null,user))
    .catch(err=> done(err));
})

passport.checkAuthentication = (req,res,next)=>{
  if(req.isAuthenticated()) return next();
  return res.redirect("/user/login");
}

passport.setAuthenticatedUser = (req,res,next)=>{
  if(req.isAuthenticated()) res.locals.user = req.user;
  next();
}


module.exports = passport;