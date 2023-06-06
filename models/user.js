const Joi = require('joi');
const jwt = require("jsonwebtoken");

const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 5,
    max: 50
  },
  email: {
     type: String,
     required: true,
     min: 10,
     max: 255,
     unique : true
  },
  password: {
    type: String,
    required: true,
    min: 5,
    max: 1024
  },
  isAdmin:Boolean
});

userSchema.methods.generateAuth = function (){
  return jwt.sign({_id:this._id,isAdmin:this.isAdmin}, 'jwtPrivateKey');
}

const userModel = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(10).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });

  return schema.validate(user);
}

function validateAuth(user) {
    const schema = Joi.object({
      email: Joi.string().min(10).max(255).required().email(),
      password: Joi.string().min(5).max(1024).required(),
    });
  
    return schema.validate(user);
  }


module.exports.userSchema = userSchema;
module.exports.userModel = userModel;
module.exports.validateUser = validateUser;
module.exports.validateAuth = validateAuth;