const Post = require('../models/posts');
const Comment = require('../models/comments');

// module.exports.create = (req,res)=>{
//     Post.findById(req.body.post).then((post)=>{
//         if(post){
//             Comment.create({
//                 content:req.body.content,
//                 post:req.body.post,
//                 user:req.user._id
//             }).then((comment)=>{
//                 post.comments.push(comment);
//                 post.save();
//                 return res.redirect('back');
//             }).catch((err)=>{
//                 return console.log(err,"Error in creating comments");
//             })
//         }
//     }).catch((err)=>{
//         return console.log(err,"error in findin the post");
//     })
// };

module.exports.create = async(req,res)=>{

    try{
        let post = await Post.findById(req.body.post);
            if(post){
              let comment = await  Comment.create({
                    content:req.body.content,
                    post:req.body.post,
                    user:req.user._id
                })
                post.comments.push(comment);
                post.save();
                req.flash('success','Comment Published');
                return res.redirect('back');
             }

    }catch(err){
        return console.log('Error',err);
    }

    
};

//delete comments

// module.exports.destroy = (req,res)=>{
//     Comment.findById(req.params.id).then((comment)=>{
//         if(comment.user == req.user.id){
//             let postId = comment.post;
//             comment.deleteOne();
//             Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}}).then(()=>{
//                 return res.redirect('back');
//             }).catch((err)=>{
//                 return console.log(err,"Error in deleting a comment");
//             })
//         }
//     }).catch((err)=>{
//         return console.log(err,"Error in finding comment while deleting comment");
//     })
// }


module.exports.destroy = async(req,res)=>{

    try{

       let comment = await Comment.findById(req.params.id)
            if(comment.user == req.user.id){
                let postId = comment.post;
                comment.deleteOne();
                await Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}});
                req.flash('success','Comment deleted successfully');
                return res.redirect('back');
            }else{
                req.flash('error','You are not Authorized to delete these comment');
                return res.redirect('back');
            }

    }catch(err){
        return console.log("Error",err);
    }
    
}




