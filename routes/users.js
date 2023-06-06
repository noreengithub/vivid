var express = require("express");
const auth =  require("../middleware/auth");
const {userModel, validateUser} = require('../models/user');
const bcrypt = require("bcrypt");
const router = express.Router();
const req = require('express/lib/request');

router.use(express.json());

router.get('/',async(req,res)=>{

    const users = userModel.find();
    res.send({'status':'success','message':'All users','data':users});
});

router.get('/me', auth, async(req,res)=>{

    const user = await userModel.findById(req.user._id).select("-password");
    res.send({'status':'success','message':'My Data','data':user});
});

router.post('/',async(req,res)=>{

    const {error} = validateUser(req.body);
    if(error) return res.status(400).send({'status':'failed','message':  error.details[0].message,'data':[]});

    const userExists = await userModel.findOne({email:req.body.email });
    
    if (userExists) return res.status(400).send({'status':'failed','message':  'The user already exists with this email address.','data':[]});

    const user = new userModel({
        name : req.body.name,
        email : req.body.email,
        password:  req.body.password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password =await bcrypt.hash(user.password,salt);
            
    let userData =  await user.save();

    const token = user.generateAuth();
    return res.header('x-auth-token',token).send({'status':'success','message':'The user added successfully!','data':userData});
});

module.exports=router;