const mongoose =require('mongoose');
var Joi = require("joi");

const genresSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
});
 
//validation for project

const genreModel = mongoose.model('genres',genresSchema);

function validateGenre(genre){

    const schema = Joi.object({
        name : Joi.string().required()
    });

    return schema.validate(genre);
}

module.exports.genreSchema = genresSchema ;
module.exports.genreModel = genreModel;
module.exports.validateGenre = validateGenre;