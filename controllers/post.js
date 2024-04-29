const Post = require("../models/post");

const displayPost = (req,res)=>{
    return res.render("post",{
        title:"User Posts"
    })
}

const create = async (req, res) => {
  try {
      console.log(req.body);
    await Post.create({
        content: req.body.content,
        user : req.user._id,
    });
  } catch (err) {
    console.log("Error intrupt while creating post", err);
  }
};
module.exports = {create,displayPost}
