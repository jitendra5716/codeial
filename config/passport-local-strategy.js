const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField:'email',
    passReqToCallback:true
},(req,email,password, done)=>{
    User.findOne({email:email}).then((user)=>{
        if(!user || user.password != password){
            req.flash('error',"Invalid Username/Password");
            return done(null,false);
        }else{
            return done(null,user);
        }
    }).catch((err)=>{
        console.log("Error in finding the user in passport-local");
        return done(err);
    })
}
));

passport.serializeUser((user,done)=>{
    done(null,user.id);
})

passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        return done(null,user);
    }).catch((err)=>{
        console.log("error in deserialize user");
        return done(err);
    })
})

passport.checkAuthentication = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    //if user is not signed in

    return res.redirect('/users/signIn');
};

passport.setAuthenticatedUser = (req,res,next)=>{
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;