const express = require('express');
const usersController = require('../controllers/users_controller');
const router = express.Router();
const passport = require('passport');

router.get('/profile/:id',passport.checkAuthentication,usersController.profile);

router.post('/update/:id',passport.checkAuthentication,usersController.update);

router.get('/signUp',usersController.signup);

router.get('/signIn',usersController.signIn);

router.get('/signOut',usersController.destroySession);

router.post('/create',usersController.create);

router.post('/createSession',passport.authenticate(
    'local',{
        failureRedirect:'/users/signIn'
    }
),usersController.createSession);

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));

router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/signIn'}),usersController.createSession);

module.exports = router;