const express = require("express");
const path = require("path");
const app = express();
const passport = require('passport');
const passportConfig = require("./middleware/passport-local-strategy")
const cookieParser = require("cookie-parser");
const router = require("./routes/user");
const routerPost = require("./routes/post");
const mongoose = require("mongoose");

const User = require("./models/user");
const { restrictToLoggedinUserOnly } = require("./middleware/auth");
const session = require('express-session');
const MongoStore = require('connect-mongo');

// mongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/login-user")
  .then(() => console.log("connection is ready to use."))
  .catch((err) => console.log("error to create connection to db"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Session configuration
app.use(session({
  name:"codial",
  secret:"somethingbla",
  resave: false,
  saveUninitialized: false,
  cookie:{
    maxAge: (1000*60*100),
  },
  store: MongoStore.create({                //MongoStore store for session cookies
    mongoUrl:"mongodb://127.0.0.1:27017/login-user",
    ttl: 14 * 24 * 60 * 60,
    autoRemove: "disabled"
  },function (err) {
     console.log(err || "connect mongodb setup-OK");
  })
}))
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser)

app.use("/user", router);
app.use("/posts", routerPost);


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

// app.get("/login",(req,res)=>{
//     return res.render("login")
// })

app.get("/",passport.checkAuthentication,(req, res) => {   //app.get("/",restrictToLoggedinUserOnly,(req, res)
       console.log(req.user);
        return res.render("home", {
          title: "Profile Details",
          user : req.user,
          contactlist: contact,
        });
    
});

app.post("/addUser", (req, res) => { 
  const { inputField, phoneNum } = req.body;
  contact.push({
    name: inputField,
    phone: +phoneNum,
  });
  return res.redirect("back"); // just shortCut to get back data on same page
});

app.listen(8000, () => {
  console.log(`server is running at port no.8000`);
});
