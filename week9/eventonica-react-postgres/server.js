require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mountRoutes = require('./routes/index');

const app = express();

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// handle cors error
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, Content-Type');
  next();
});

// routes
mountRoutes(app);

app.get('*', (req, res) => {
  res.json({ msg: 'Welcome to Eventonica.'})
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));