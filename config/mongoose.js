const mongoose = require('mongoose');

mongoose.set('strictQuery',false);

const MONGO_URI = "mongodb+srv://code:db@cluster0.fyewd6m.mongodb.net/";

mongoose.connect(MONGO_URI);

const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error in connecting to db"));


db.once('open',()=>{
    console.log("Database Successfully connectd : MongoDB ");
})