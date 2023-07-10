const express = require('express')
const userRouter = express.Router()
require('dotenv').config()
const {userModel} = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


userRouter.post('/register',async(req,res) => {
    try {
        const {name,email,password,address} = req.body;
    
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: 'User already exists' });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const user = new userModel({ name, email, password: hashedPassword, address });
        await user.save();
    
        res.status(201).json({ message: 'User registered successfully' });
      } catch (err) {
        res.status(500).json({ message: 'Registration failed', "err":err.message});
      }
})


userRouter.post('/login', async(req,res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ userId: user._id, username:user.name, useremail:user.email}, process.env.secretkey);
        res.status(201).json({ msg:"login successfull",token });
      } catch (err) {
        res.status(500).json({ message: 'Login failed','err':err.message });
      }
})


userRouter.patch('/:id/reset', async (req, res) => {
    try {
      const { id } = req.params;
      const { currentPassword, newPassword } = req.body;
  
      const user = await userModel.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const passwordMatch = await bcrypt.compare(currentPassword, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid current password' });
      }
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      user.password = hashedPassword;
      await user.save();
  
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ message: 'Password reset failed', err: err.message });
    }
  });



module.exports = {
userRouter
}
