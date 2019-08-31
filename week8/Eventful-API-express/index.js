const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/index');

const hostname = '127.0.0.1';
const port = 3000;
const app = express(); // setup express application
const server = http.createServer(app);

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

routes(app);

app.get('*', (req, res) => res.status(200).send({ message: 'Welcome to Eventonica', }));

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});