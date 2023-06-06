var Joi = require("joi");
const mongoose =require('mongoose');

const {movieSchema} = require('./movie');
const {customerSchema} = require('./customer');

const rentalModel = mongoose.model('Rentals', new mongoose.Schema({
  movie: { 
    type: movieSchema,  
    required: true
  },
  customer: { 
    type: customerSchema,  
    required: true
  },
  dateOut: { 
    type: Date, 
    required: true,
    default: Date.now
  },
  dateReturned: { 
    type: Date
  },
  rentalFee: { 
    type: Number, 
    min: 0
  }
}));

function validateRental(rental) {

  let schema = Joi.object({
    movieId: Joi.string().required(),
    customerId: Joi.string().required(),
    dateOut: Joi.date().required(),
    dateReturned: Joi.date().required(),
    rentalFee: Joi.number().required(),
  });

  return schema.validate(rental);
}

exports.rentalModel = rentalModel; 
exports.validateRental = validateRental;

