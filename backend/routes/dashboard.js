const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/authMiddleware");

// @desc  Dashboard route - protected
// @route GET /dashboard
router.get("/", ensureAuth, (req, res) => {
  res.json({
    message: `Welcome to your dashboard, ${req.user.displayName}!`,
    user: req.user,
  });
});

module.exports = router;
