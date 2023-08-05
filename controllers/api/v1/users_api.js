const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

module.exports.createSession = async(req,res)=>{
    try{
        let user = await User.findOne({email:req.body.email});
        if(!user || user.password != req.body.password){
            return res.json(422,{
                message:"Invalid Username/Password"
            })
        }else{
            return res.json(200,{
                message:"Logged in Successfully, here is your token please keep it safe",
                data:{
                    token: jwt.sign(user.toJSON(),'Codeial',{expiresIn:'100000'})
                }
            })
        }
        
    }catch(err){
        return res.json(500,{
            message:"Internal Server Error!"
        })
    }
}