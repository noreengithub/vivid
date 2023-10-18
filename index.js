var express = require("express");

// require('express-async-errors');

// const mongoose = require('mongoose');

// const error = require("./middleware/error");
// const customers = require("./routes/customers");
// const genres = require("./routes/genres");
// const movies = require("./routes/movies");
// const rentals = require("./routes/rentals");
// const users = require("./routes/users");
// const auth = require("./routes/auth");
 const home = require("./routes/home");
// const config = require('config');
// const { exist } = require('joi');
// const { transports } = require("winston");
// const dotenv=require('dotenv').config();

// const winston = require("winston");

// const logger = winston.createLogger({
//    transports: [
//      new winston.transports.Console(),
//      new winston.transports.File({ filename: 'combined66.log' })
//    ]
//  });

//console.log(process.env.JWTKey)
//if(!config.get(process.env.JWTKey)){
   // console.log("FATAL ERROR: jwtPrivateKey is not defined!");
   //process.exit(1);
//}

var app = express();


//mongoose.set("strictQuery", false);

//const Connt= mongoose.connect('mongodb://localhost/vidly');

// app.use( "/api/genres",genres);
// app.use( "/api/customers",customers);
// app.use( "/api/movies",movies);
// app.use( "/api/rentals",rentals);
// app.use( "/api/users",users);
// app.use( "/api/auth",auth);

console.log("hello world");
app.use( '/',home);
//app.use(error);

const port =  3000;
console.log(port);
console.log("console log user here! we will test all the data here!..");

app.listen(3000,()=>{console.log(`listening ${port} port`)})

