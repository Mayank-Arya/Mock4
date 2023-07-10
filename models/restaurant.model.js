const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zip: String
  },
  menu: [
    {
      name: String,
      description: String,
      price: Number,
      image: String
    }
  ]
});

const restaurantModel = mongoose.model('restaurant', restaurantSchema);


module.exports = {restaurantModel}