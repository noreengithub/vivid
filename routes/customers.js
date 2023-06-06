var express = require("express");
var Joi = require("joi");
const mongoose =require('mongoose');
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const req = require('express/lib/request');
const { customerModel , validateCustomer } = require('../models/customer');
const router = express.Router();
router.use(express.json());

router.get("/", async (req,res) => {
    
    const customers = await customerModel.find();
    
    return res.send({'status':'success','message':'All customers','data':customers});
});

router.get("/:id",async(req,res) => {

    let customer = await customerModel.find(  { _id: req.params.id}).select({name:1});

    if(!customer) return res.status(404).send({'status':'failed','message': 'The customer not found!','data':[]});

    return res.send({'status':'success','message':'','data':customer});
});

router.put("/:id", async(req,res)=> {

    let customer = await customerModel.find(  { _id: req.params.id});
    if(!customer) return res.status(404).send({'status':'failed','message': 'The customer not found!','data':[]});

    const { error } = validateCustomer(req.body);
    if(error) return res.status(400).send({'status':'failed','message':  error.details[0].message,'data':[]});

    const result = await Customer.findByIdAndUpdate(req.params.id,
        { 
          name: req.body.name,
          isGold: req.body.isGold,
          phone: req.body.phone
        }, { new: true });

    return res.send({'status':'success','message':'The customer updated successfully!','data':result});
});

router.delete("/:id", [auth,admin],async(req,res)=>{

    let customer = await customerModel.findById(  req.params.id); 
    if(!customer) return res.status(404).send({'status':'failed','message': 'The customer not found!','data':[]});

    const { error } = validateCustomer(req.body);
    if(error) return res.status(400).send({'status':'failed','message':  error.details[0].message,'data':[]});

    const customerData = await customerModel.deleteOne({_id:req.params.id});
    return res.send({'status':'success','message':'The customer deleted successfully!','data':customerData});
});

router.post("/", auth,async (req,res)=>{

    const { error } = validateCustomer(req.body);
    if(error) return res.status(400).send({'status':'failed','message':  error.details[0].message,'data':[]});
    
    const customer = new customerModel({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    });
            
    let customerData =  await customer.save();
    return res.send({'status':'success','message':'The customer added successfully!','data':customerData});
});









 
module.exports = router;