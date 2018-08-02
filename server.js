const express = require('express');
const mongoose = require('mongoose');

const recipes = require('./routes/api/recipes');

const app = express();
const port = process.env.PORT || 5000;

const db = require('./config/keys').mongoURI;

mongoose
  .connect(db)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => res.send('hi, babe'));

app.use('/api/recipes', recipes);

app.listen(port, () => {
  console.log(`Server is running on posrt ${port}`);
});
