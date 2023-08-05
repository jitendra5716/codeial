const express = require('express');
const port = 8000;
const app = express();
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

app.use(expressLayouts);
app.use(express.urlencoded());

app.use(cookieParser())
app.use(express.static('./assets'));
app.use('/uploads', express.static(__dirname+'/uploads'));

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name:'codeial',
    secret:'something',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*1000),
    },
    store: MongoStore.create({mongoUrl:'mongodb://localhost/codeial_development_rev'})
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

app.use('/',require('./routes'));


app.listen(port,(err)=>{
    if(err){
        return console.log("Error in running server");
    }
    console.log("Server is running on port : ",port);
})