const jwt = require("jsonwebtoken");

function authM (req,res,next) {

    console.log("adminauth");
    next();
}
 

function auth(req,res,next){
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Access denied. No token provided.');

    try{
        const decoded = jwt.verify(token, 'jwtPrivateKey');
        req.user= decoded;
        next();

    }catch(e){
        res.status(400).send("Invalid toke."+ e)
    }
}

module.exports = authM;
module.exports = auth;