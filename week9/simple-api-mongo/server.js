const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/index');

const PORT = 3000;

const app = express();

app.use(bodyParser.json()); // parse incoming request data
app.use(bodyParser.urlencoded({ extended: true })); //process URL encoded forms

routes(app);

app.listen(PORT, () => { console.log(`We are live on ${PORT}...`) });