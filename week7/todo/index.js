const express = require('express');
const bodyParser = require('body-parser');
const db = require('./js/db.js');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/',function(req,res){
  res.json({"error" : false, "message" : "Hello !"});
});

app.get('/all', db.getAllData);
app.get('/:id', db.getDataById);
app.post('/add', db.createData);

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
});