require('dotenv').config();
const express = require('express');
const mountRoutes = require('./routes/index');
const path = require('path');
const PORT = process.env.PORT || 5000;

const app = express();

// support parsing of application/json type post data
app.use(express.json());
// parsing the URL-encoded data with the querystring library (when false) or the qs library (when true)
app.use(express.urlencoded({ extended: true })); 

// routes
mountRoutes(app);

// production mode
if (process.env.NODE_ENV === 'production') {
  //Static file declaration
  app.use(express.static(path.join(__dirname, 'client/build')));
  //build mode 
  app.get('*', (req, res) => { res.sendfile(path.join(__dirname = 'client/build/index.html')); })

} else {

  // handle cors error
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, Content-Type');
    next();
  });

  app.get('*', (req, res) => {
    res.json({ msg: 'Welcome to Eventonica.' })
  });
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));