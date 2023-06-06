const Joi = require('joi');
const mongoose = require('mongoose');

const customerSchema =new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  isGold: {
    type: Boolean,
    default: false
  },
  phone: {
    type: String,
    required: true,
  }
})

const customerModel = mongoose.model('Customer', customerSchema);

function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().required(),
    isGold: Joi.boolean(),
    phone: Joi.string().required(),
  });

  return schema.validate(customer);
}


module.exports.customerSchema = customerSchema;
module.exports.customerModel = customerModel;
module.exports.validateCustomer = validateCustomer;