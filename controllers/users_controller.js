const User = require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.profile = function(req, res){

    User.findById(req.params.id).then((user)=>{
        return res.render('profile', {
            title: 'User Profile',
            profile_user:user
        })
    }).catch((err)=>{
        return console.log(err,"Error in finding the user");
    })
    
}
// module.exports.update = (req,res)=>{
//     if(req.user.id == req.params.id){
//             User.findByIdAndUpdate(req.params.id,req.body).then((user)=>{
//                 return res.redirect('back');
//             }).catch((err)=>{
//                 return console.log(err,"Error in finding the user id");
//             })
//     }else{
//         return res.status(401).send("UnAuthorized");
//     }
// }

module.exports.update = async(req,res)=>{
    try{
        if(req.user.id == req.params.id){
        let user = await User.findById(req.params.id);
         User.uploadedAvatar(req,res,(err)=>{
                if(err){
                    return console.log("Multer error",err);
                }
                user.name = req.body.name;
                user.email = req.body.email;
                if(req.file){
                    // if(user.avatar){
                    //     fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    // }
                    user.avatar = User.avatarPath+'/'+req.file.filename
                }
                user.save();
                return res.redirect('back');
            })
        }else{
            return res.status(401).send("UnAuthorized");
        }

    }catch(err){

    }
}



module.exports.signup = (req,res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('signUp',{
        title:"SignUp Page"
    })
};

module.exports.signIn = (req,res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('signIn',{
        title:"Sign In"
    })
}

module.exports.create = (req,res)=>{
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email:req.body.email}).then((user)=>{
        if(!user){
            User.create(req.body).then(()=>{
                return res.redirect('/users/signIn');
            }).catch((err)=>{
                return console.log("Error in creating the user in database");
            })
        }
    }).catch((err)=>{
        return console.log("Error in finding the user in database!");
    })
}
//user sign in
module.exports.createSession = (req,res)=>{
    req.flash('success','Logged in Successfully!');
    res.redirect('/');
    
    return;
}

//sign Out

module.exports.destroySession = (req,res)=>{
    
    req.logOut((err)=>{
        if(err){
            return console.log("Error in destroying the session");
        }
       req.flash('success','Logged Out Successfully!');
       return res.redirect('/users/signIn');
    });
}