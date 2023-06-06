const winston = require("../logFormat");

 

module.exports = function(err,req,res,next){

    
    winston.info( err.message);
    return res.status(500).send("something wrong");
  
}