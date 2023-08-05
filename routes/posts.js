const express = require('express');

const router = express.Router();

const postsCotroller = require('../controllers/posts_controller');
const passport = require('passport');

router.post('/create',passport.checkAuthentication,postsCotroller.create);
router.get('/delete/:id',passport.checkAuthentication,postsCotroller.destroy);


module.exports = router;