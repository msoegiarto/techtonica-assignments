const { Pool } = require('pg');

const pool = new Pool();

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

const getAllData = (request, response) => {
  //promise
  pool
    .connect()
    .then(client => {
      return client
        .query('SELECT * FROM todo_items')
        .then(res => {
          client.release();
          console.log(res.rows);
          response.status(200).json(res.rows);
        })
        .catch(err => {
          client.release();
          console.log(err.stack);
        })
    });
}

const getDataById = (request, response) => {
  const id = parseInt(request.params.id);
  pool
    .connect()
    .then(client => {
      return client
        .query('SELECT * FROM todo_items WHERE id = $1', [id])
        .then(res => {
          client.release();
          console.log(res.rows);
          response.status(200).json(res.rows);
        })
        .catch(err => {
          client.release();
          console.log(err.stack);
        })
    });
}

const createData = (request, response) => {
  console.log('request.body = ', request.body);
  const entry = request.body.entry;

  pool.query('INSERT INTO todo_items (entry) VALUES ($1)', [entry], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(201).send(`User added with ID: ${results.insertId}`);
  })
}

module.exports = {
  getAllData,
  getDataById,
  createData,
}