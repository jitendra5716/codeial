const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

passport.use(new googleStrategy({
    clientID: '628039627446-ss788bfandm6959qai5s4r7geoadfp1h.apps.googleusercontent.com',
    clientSecret:'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',
    callbackURL:'http://localhost:8000/users/auth/google/callback'
},(accessToken,refreshToken,profile,done)=>{
    User.findOne({email:profile.emails[0].value}).then((user)=>{
        // console.log(profile);
        if(user){
            return done(null,user);
        }else{
            User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password:crypto.randomBytes(20).toString('hex')
            }).then((user)=>{
                return done(null,user);
            }).catch((err)=>{
                return console.log("Error in google auth to create a user");
            })
        }
    }).catch((err)=>{
        return console.log("Error in finding the user in google auth");
    })
}));

module.exports = passport;