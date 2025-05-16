const express = require("express");
const passport = require("passport");
import express from 'express';
import User from '../models/User.js';

// @desc Auth with Google
// @route GET /auth/google
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// @desc Google auth callback
// @route GET /auth/google/callback
router.get(
"/google/callback",
passport.authenticate("google", {
failureRedirect: "/login",
successRedirect: "/dashboard",
})
);

// @desc Logout user
// @route /auth/logout
router.get("/logout", (req, res) => {
req.logout(function (err) {
if (err) {
return res.status(500).send("Logout error");
}
res.redirect("/");
});
});

// @desc Get current authenticated user
// @route GET /auth/user
router.get("/user", (req, res) => {
if (req.isAuthenticated()) {
res.json(req.user);
} else {
res.status(401).json({ message: "Not authenticated" });
}
});
module.exports = router;


const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({ fullName, email, password }); 
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
