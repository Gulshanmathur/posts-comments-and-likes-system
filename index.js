const express = require("express");
const path = require("path");
const app = express();
const cookieParser = require("cookie-parser");
const router = require("./routes/user");
const routerPost = require("./routes/post");
const mongoose = require("mongoose");
const User = require("./models/user");
const { restrictToLoggedinUserOnly } = require("./middleware/auth");
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/user", router);
app.use("/posts", routerPost);

mongoose
  .connect("mongodb://127.0.0.1:27017/login-user")
  .then(() => console.log("connection is ready to use."))
  .catch((err) => console.log("error to create connection to db"));

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

app.get("/",restrictToLoggedinUserOnly,(req, res) => {

        return res.render("home", {
          title: "Profile Details",
          user: req.user,
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
