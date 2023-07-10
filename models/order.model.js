const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: 'user' },
  restaurant: { type: mongoose.Types.ObjectId, ref: 'restaurant' },
  items: [
    {
      name: String,
      price: Number,
      quantity: Number
    }
  ],
  totalPrice: Number,
  deliveryAddress: {
    street: String,
    city: String,
    state: String,
    country: String,
    zip: String
  },
  status: String
});

const orderModel = mongoose.model('order', orderSchema);


module.exports = {orderModel}