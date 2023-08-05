const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

let opts = {
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey:'Codeial'
}

passport.use(new JWTStrategy(opts,(jwtPayload,done)=>{
    User.findById(jwtPayload._id).then((user)=>{
        if(user){
            return done(null,user);
        }else{
            return done(null,false);
        }
    }).catch((err)=>{
        return console.log("Error in finding the user in jwt",err);
    })
}));

module.exports = passport;