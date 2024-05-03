const Post = require("../models/post");
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

const displayPost = async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate('user')
      .populate({
        path: "comments",
        populate: {
          path: 'user'
        }
      })
      .exec();
      console.log(posts[0]);
    return res.render("post", {
      title: "User Posts",
      posts: posts
    });
  } catch (error) {
    console.log("Error fetching posts:", error);
  }
};

const create = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Request body is empty" });
    }
    const post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });

    res.redirect("back");
  } catch (err) {
    console.log("Error intrupt while creating post", err);
  }
};
module.exports = { create, displayPost };
