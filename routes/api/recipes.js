const express = require('express');
const mongoose = require('mongoose');

const Recipe = require('./../../models/Recipe');
const validateRecipeInput = require('./../../validation/recipe');

const router = express.Router();

// @route   POST /api/recipes
// @desc    Create recipe
// @access  Public
router.post('/', (req, res) => {
  const { errors, isValid } = validateRecipeInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newRecipe = new Recipe({
    name: req.body.name,
    text: req.body.text
  });

  newRecipe.save().then(recipe => res.json(recipe));
});

// @route   GET /api/recipes
// @desc    Get all recipes
// @access  Public
router.get('/', (req, res) => {
  Recipe.find()
    .sort({ date: -1 })
    .then(recipes => res.json(recipes))
    .catch(err => res.status(404).json({ norecipesfound: 'No recipes found' }));
});

// @route   GET /api/recipes/:id
// @desc    Get all recipes
// @access  Public
router.get('/:id', (req, res) => {
  Recipe.findById(req.params.id)
    .then(recipe => res.json(recipe))
    .catch(err =>
      res.status(404).json({ norecipefound: 'No recipe found with that ID' })
    );
});

// @route   DELETE /api/recipes/:id
// @desc    Delete recipe
// @access  Public
router.delete('/:id', (req, res) => {
  Recipe.findById(req.params.id)
    .then(recipe => {
      recipe.remove().then(() => res.json({ success: true }));
    })
    .catch(err => res.status(404).json({ recipenotfound: 'Recipe not found' }));
});

// @route   POST /api/recipes/:id
// @desc    Update recipe
// @access  Public
router.post('/:id', (req, res) => {
  const updateFilds = {};

  if (req.body.name) updateFilds.name = req.body.name;
  if (req.body.text) updateFilds.text = req.body.text;

  Recipe.findOneAndUpdate(
    { _id: req.params.id },
    { $set: updateFilds },
    { new: true }
  )
    .then(recipe => res.json(recipe))
    .catch(err => res.status(404).json({ recipenotfound: 'Recipe not found' }));
});

module.exports = router;
