const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// Sign-up POST route
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      // Check if email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.render('forms', {
          message: 'Email is already registered',
          messageType: 'error',
        });
      }
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create new user
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });
  
      await newUser.save();
  
      // Set session for the user
      req.session.user = newUser;
  
      // Redirect to the dashboard with the user object
      res.render('dashboard', {
        user: newUser, // Pass the user object to the dashboard view
        message: 'Signup successful! Welcome!',
        messageType: 'success',
      });
    } catch (err) {
      console.error(err);
      res.render('forms', {
        message: 'Something went wrong!',
        messageType: 'error',
      });
    }
  });
  



  // Sign-in POST route
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.render('forms', {
          message: 'Invalid email or password',
          messageType: 'error',
        });
      }
  
      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.render('forms', {
          message: 'Invalid email or password',
          messageType: 'error',
        });
      }
  
      // Set session for the user
      req.session.user = user;
  
      // Redirect to the dashboard with the user object
      res.render('dashboard', {
        user: user, // Pass the user object to the dashboard view
        message: 'Welcome back!',
        messageType: 'success',
      });
    } catch (err) {
      console.error(err);
      res.render('forms', {
        message: 'Something went wrong!',
        messageType: 'error',
      });
    }
  });
  


module.exports = router;
