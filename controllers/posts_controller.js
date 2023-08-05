const  Post = require('../models/posts.js');
const Comment = require('../models/comments');
// module.exports.create = (req,res)=>{
//     Post.create({
//         content:req.body.content,
//         user:req.user._id
//     }).then(()=>{
//         return res.redirect('back');
//     }).catch((err)=>{
//         return console.log("Error in creating post to database");
//     })
// }

module.exports.create = async (req,res)=>{
    try{
        let post =  await Post.create({
            content:req.body.content,
            user:req.user._id
        })
        if(req.xhr){
            return res.status(200).json({
                data:{
                    post:post
                },
                message:'Post Created'
            })
        }
        req.flash('success','Post Published!');
        return res.redirect('back');
    }catch(err){
        return console.log("Error",err);
    }
    
}

//delete a post

// module.exports.destroy = (req,res)=>{
//     Post.findById(req.params.id).then((post)=>{
//         if(post.user == req.user.id){
//             post.deleteOne();
//             Comment.deleteMany({post:req.params.id}).then(()=>{
//                 return res.redirect('back');
//             }).catch((err)=>{
//                 return console.log(err,"Error in deleting many comments related to delted post");
//             })
//         }else{
//             return res.redirect('back');
//         }
//     }).catch((err)=>{
//         return console.log(err,"Error in finding the post while deleting a post");
//     })
// }

module.exports.destroy = async (req,res)=>{

    try{
        let post  = await Post.findById(req.params.id)
            if(post.user == req.user.id){
                if(req.xhr){
                    return res.status(200).json({
                        data:{
                            post_id:req.params.id
                        },
                        message:"Post Deleted"
                    })
                }
                post.deleteOne();
               await Comment.deleteMany({post:req.params.id});
                    req.flash('success','Post and associated comments are deleted successfully!');
                    return res.redirect('back');
            }else{
                req.flash('error','You are not Authorized to delete this Post');
                return res.redirect('back');
            }
        }catch(err){
            return console.log("Error",err);
        }
    
}