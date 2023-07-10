const express = require('express')
const restaurantRouter = express.Router()
require('dotenv').config()
const {restaurantModel} = require('../models/restaurant.model');


restaurantRouter.get('/api/restaurants',async (req, res) => {
    try {
      const restaurants = await restaurantModel.find();
      res.status(200).send(restaurants);
    } catch (err) {
      res.status(500).send(err);
    }
  }) 

restaurantRouter.get('/api/restaurants/:id',async (req, res) => {
    try {
      const restaurant = await restaurantModel.findById(req.params.id);
      if (!restaurant) {
        return res.status(404).send({ message: 'Restaurant not found' });
      }
      res.status(200).send(restaurant);
    } catch (error) {
      res.status(500).send({ message: 'Failed to fetch restaurant' });
    }
  } )

restaurantRouter.get('/api/restaurants/:id/menu',async (req,res) => {
    try {
      const restaurant = await restaurantModel.findById(req.params.id);
      if (!restaurant) {
        return res.status(404).send({ msg: 'Restaurant not found' });
      }
      res.status(200).send(restaurant.menu);
    } catch (err) {
      res.status(500).send({err});
    }
  } );


  restaurantRouter.post('/api/addrestaurant', async (req, res) => {
    try {
      const {name,address,menu} = req.body;
  
      const restaurant = new restaurantModel({name,address, menu });
      await restaurant.save();
  
      res.status(201).send({ message: 'Restaurant created successfully',restaurant });
    } catch (err) {
      res.status(500).send({ message: 'Failed to create restaurant', err: err.message });
    }
  });


restaurantRouter.post('/api/restaurants/:id/menu',  async (req, res) => {
    try {
      const restaurant = await restaurantModel.findById(req.params.id);
      if (!restaurant) {
        return res.status(404).send({ message: 'Restaurant not found' });
      }
  
      const {name,description,price,image } = req.body;
      const menuItem = { name, description, price, image };
      restaurant.menu.push(menuItem);
      await restaurant.save();
  
      res.status(201).send({ message: 'Menu item added successfully' });
    } catch (err) {
      res.status(400).send({err});
    }
  });


restaurantRouter.delete('/api/restaurants/:id/menu/:id',  async (req, res) => {
    try {
      const restaurant = await restaurantModel.findById(req.params.id);
      if (!restaurant) {
        return res.status(404).send({ message: 'Restaurant not found' });
      }
  
      const menuItemId = req.params.menuItemId;
      restaurant.menu = restaurant.menu.filter((item) => item._id.toString() !== menuItemId);
      await restaurant.save();
  
      res.status(202).send({ message: 'Menu item deleted successfully' });
    } catch (error) {
      res.status(500).send({ message: 'Failed to delete menu item' });
    }
  });

module.exports = {restaurantRouter}