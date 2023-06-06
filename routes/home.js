var express = require("express");
const req = require('express/lib/request');
const router = express();

router.set('view engine','pug');
router.set('views','./views');

router.get("/",(req,res) =>{
    
    return  res.render( 'index',{'title':'My Express Project','message':'Hello'});
});

module.exports = router;

 