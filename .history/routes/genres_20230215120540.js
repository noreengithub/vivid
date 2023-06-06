var express = require("express");
var Joi = require("joi");
const mongoose =require('mongoose');
const { genreModel , validateGenre } = require('../models/genre');

const req = require('express/lib/request');
const router = express.Router();
router.use(express.json());

router.get("/", async (req,res) => {
    
    throw new Error("can not get genres");
    const genres = await genreModel.find();
    
    return res.send({'status':'success','message':'All genres','data':genres});
});

router.get("/:id",async(req,res) => {

    let genre = await genreModel.find(  { _id: req.params.id}).select({name:1});

    genreModel.find({_id: req.params.id}).select({name:1});
    if(!genre) return res.status(404).send({'status':'failed','message': 'The genre not found!','data':[]});

    return res.send({'status':'success','message':'','data':genre});
});

router.put("/:id", async(req,res)=> {

    let genre = await genreModel.find(  { _id: req.params.id});
    if(!genre) return res.status(404).send({'status':'failed','message': 'The genre not found!','data':[]});

    const { error } = validateGenre(req.body);
    if(error) return res.status(400).send({'status':'failed','message':  error.details[0].message,'data':[]});

    const result = await genreModel.update({ _id:req.params.id },{
        $set:{
            name : req.body.name
        }
    });

    return res.send({'status':'success','message':'The genre updated successfully!','data':result});
});

router.delete("/:id", async(req,res)=>{

    let genre = genres.find( gr => gr.id === parseInt(req.params.id)); 
    if(!genre) return res.status(404).send({'status':'failed','message': 'The genre not found!','data':[]});

    const { error } = validateGenre(req.body);
    const { test } =validateGenre(req.body);
    if(error) return res.status(400).send({'status':'failed','message':  error.details[0].message,'data':[]});

    const genreData = await genreModel.deleteOne({_id:req.params.id});
    return res.send({'status':'success','message':'The genre deleted successfully!','data':genreData});
});

router.post("/", async (req,res)=>{

    const { error } = validateGenre(req.body);
    if(error) return res.status(400).send({'status':'failed','message':  error.details[0].message,'data':[]});
    
    const genre = new genreModel({
        name : req.body.name,
    });
            
    let genreData =  await genre.save();

    genreData.delete({"status": "success"});

    return res.send({'status':'success','message':'The genre added successfully!','data':genreData});
});

module.exports = router;