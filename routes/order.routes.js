const express = require('express');
const orderRouter = express.Router();
const {userModel} = require('../models/user.model')
const {orderModel} = require('../models/order.model');
const { restaurantModel } = require('../models/restaurant.model');




orderRouter.post("/api/orders", async (req, res) => {

    let { user, restaurant,items,delivery_address,status} = req.body;

    try {
        const userdata = await userModel.findById(user);
        const restaurantdata = await restaurantModel.findById(restaurant);
        
        if (!userdata || !restaurantdata) {
            return res.status(404).json({ err: "Not found"});
        }

        let total_price=0;

        items.forEach(ele => {
            total_price+=ele.price*ele.quantity
        });

        let order = new orderModel({
            user: userdata,
            restaurant: restaurantdata,
            items,
            total_price,
            delivery_address,
            status
        });
        await order.save();

        res.send("Order Success")

    } catch (err) {

        res.status(500).json({ err: err.message })
    }
});


orderRouter.get("/api/orders/:id", async (req, res) => {
    try {
        let data = await orderModel.find({_id:req.params.id}).populate('user').populate('restaurant');
        res.send(data)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

orderRouter.patch('/api/orders/:id', async (req, res) => {
    let id=req.params.id
    const updateData = req.body;

    await orderModel.findByIdAndUpdate(id, updateData);
    
    res.send("Updated Successfully")
})  


module.exports = {
    orderRouter
}
