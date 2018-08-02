const express = require('express');

const router = express.Router();

// @route   GET /api/recipes
// @desc    Get all recipes
// @access  Public
router.get('/', (req, res) => res.json({ msg: 'helloo' }));

module.exports = router;
