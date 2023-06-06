const express = require("express");
const {userModel,validateAuth} = require('../models/user');
const bcrypt = require("bcrypt");
const router = express.Router();
const req = require('express/lib/request');

router.use(express.json());

router.post('/', async(req,res)=>{

     const {error} = validateAuth(req.body);
     if(error) return res.send({'status':'failed','message':  error.details[0].message,'data':[]});

     const user = await userModel.findOne({email:req.body.email });
     if (!user) return res.status(400).send({'status':'failed','message':  'Invalid email or password!','data':[]});

     const validPassword = await bcrypt.compare(req.body.password,user.password );
     if (!validPassword) return res.status(400).send({'status':'failed','message':  'Invalid email or password!','data':[]});

     const token = user.generateAuth();
     res.send(token);
});

module.exports=router;