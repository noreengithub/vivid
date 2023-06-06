var express= require("express");
var Joi = require("joi");
var  mongoose = require("mongoose");

const { rentalModel, validateRental } = require('../models/rental'); 
const { Movie } = require('../models/movie');
const { customerModel } = require('../models/customer');
 
const req = require('express/lib/request');
const router = express.Router();

router.use(express.json());

router.get('/', async (req, res) => {
    const rentalData = await rentalModel.find();
    res.send(rentalData);
});
  
  router.post('/', async (req, res) => {
  
   // const { error } = validate(req.body); 
    //if (error) return res.status(400).send(error.details[0].message);
    
    let customerData = await customerModel.findOne({ _id: req.body.customerId});
    if (!customerData) return res.status(400).send('Invalid customer.');

    let movieData = await Movie.findOne({ _id: req.body.movieId});
    if (!movieData) return res.status(400).send('Invalid movie.');
  
    if (movieData.numberInStock === 0) return res.status(400).send('Movie not in stock.');

    let rental = new rentalModel({
      customer: {
        _id: customerData._id,
        name: customerData.name,
        isGold: customerData.isGold,
        phone: customerData.phone
      },
      movie: {
        _id: movieData._id,
        title: movieData.title,
        genre:movieData.genre,
        dailyRentalRate: movieData.dailyRentalRate,
        numberInStock: movieData.numberInStock--
      },
      dateOut: req.body.dateOut,
      dateReturned: req.body.dateReturned,
      rentalFee: req.body.rentalFee,
    });

    rental = await rental.save();
    movieData.save();

    res.send(rental);

  });

  router.get('/:id', async (req, res) => {

    const { error } = validateRental(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const rental = await rentalModel.findById(req.params.id);
  
    if (!rental) return res.status(404).send('The rental with the given ID was not found.');
  
    res.send(rental);
  });
  

module.exports = router ;