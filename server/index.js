const express=require("express");
const mongoose=require("mongoose");
const cors = require("cors");
const app = express();
const userRoutes = require('./routes/usersRouter.js');
const session = require('express-session');
const crypto = require('crypto');
app.use(express.json());
app.use(cors());
app.use(
   session({
     secret: crypto.randomBytes(64).toString('hex'), // Generate a random secret
     resave: false,
     saveUninitialized: true,
     cookie: { maxAge: 7200000 },
   })
 );
//Connecting to atlas

 const db =
 '//url mongo';
mongoose.connect(db)
 .then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000);
 })
 .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
 });

 app.use('/', userRoutes);

 

