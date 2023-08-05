const Post = require('../models/posts');
const User = require('../models/user');

// module.exports.home = (req,res)=>{
//     Post.find({}).populate('user')
//     .populate({
//         path:'comments',
//         populate:{
//             path:'user'
//         }
//     })
//     .exec().then((posts)=>{
        
//         User.find({}).then((user)=>{
//             return res.render('home',{
//                 title:"Codeial | Home",
//                 posts:posts,
//                 all_users:user
//             })
//         }).catch((err)=>{
//             return console.log(err,"Error in finding the user");
//         })   
//     }).catch((err)=>{
//         return console.log("Error in finding the posts");
//     })
// }

module.exports.home = async (req,res)=>{

    try{
        let posts = await Post.find({}).populate('user').sort('-createdAt')
        .populate({
        path:'comments',
        
        populate:{
            path:'user'
        }
    })
    
    let users = await User.find({});
        
    return res.render('home',{
        title:"Codeial | Home",
        posts:posts,
        all_users:users
    })   
    }catch(err){
        return console.log("Error ",err);
    }
    
            
          
    
}