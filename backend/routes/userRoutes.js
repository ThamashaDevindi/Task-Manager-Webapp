

const express = require('express');
const router = express.Router();
const User = require('../models/User'); // adjust the path if needed

// POST /api/users - create new user
router.post('/users', async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const newUser = new User({ fullName, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
