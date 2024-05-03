const Post = require("../models/post");
const Comment = require("../models/comment")

const create = async(req,res)=>{
    try {
        const post = await Post.findById(req.body.post);
        if(post){ 
            const comment = await Comment.create({
                content:req.body.content,
                post:req.body.post, 
                user:req.user._id,
            })
            await post.comments.push(comment);
            await post.save();
        } 
        res.redirect("/post/displayPost")
    } catch (error) {
        console.error("comment missing",{error});
    }
}

module.exports = {create}