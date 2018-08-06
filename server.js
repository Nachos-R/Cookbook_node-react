const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const recipes = require('./routes/api/recipes');

const app = express();
const port = process.env.PORT || 5000;

const db = require('./config/keys').mongoURI;

mongoose
  .connect(db)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
  );
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('hi, babe'));

app.use('/api/recipes', recipes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
