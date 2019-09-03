const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const config = require('../config/db');

const addNote = (req, res) => {

  MongoClient.connect(config.url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
    if (err) return console.log(err)

    console.log(`[addNote]`, `Connected successfully to database`);

    const note = { name: req.body.name, title: req.body.title };

    const db = client.db(config.dbName);

    const mycols = db.collection('mycols');

    mycols.insertOne(note, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.status(201).send(result.ops[0]);
      }
    });

    console.log(`[addNote]`, `Ending database connection`);
    client.close();
  });
}

const getSingleNote = (req, res) => {
  MongoClient.connect(config.url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
    if (err) return console.log(err)

    console.log(`[getSingleNote]`, `Connected successfully to database`);

    const details = { '_id': new ObjectID(req.params.id) }

    const db = client.db(config.dbName);

    const mycols = db.collection('mycols');

    mycols.findOne(details, (err, item) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(item);
      }
    });

    console.log(`[getSingleNote]`, `Ending database connection`);
    client.close();
  });
}

const deleteSingleNote = (req, res) => {
  MongoClient.connect(config.url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
    if (err) return console.log(err)

    console.log(`[deleteSingleNote]`, `Connected successfully to database`);

    const details = { '_id': new ObjectID(req.params.id) }

    const db = client.db(config.dbName);

    const mycols = db.collection('mycols');

    mycols.deleteOne(details, (err, item) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        console.log(item.result);
        res.send(`{"message": "Item ${req.params.id} has been removed"}`);
      }
    });

    console.log(`[deleteSingleNote]`, `Ending database connection`);
    client.close();
  });
}

const updateSingleNote = (req, res) => {
  MongoClient.connect(config.url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
    if (err) return console.log(err)

    console.log(`[updateSingleNote]`, `Connected successfully to database`);

    const details = { '_id': new ObjectID(req.params.id) }

    const note = { name: req.body.name, title: req.body.title };

    const db = client.db(config.dbName);

    const mycols = db.collection('mycols');

    mycols.updateOne(details,
       { $set: note },
      (err, item) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        console.log(item.result);
        res.send(`{"message": "Item ${req.params.id} has been updated"}`);
      }
    });

    console.log(`[updateSingleNote]`, `Ending database connection`);
    client.close();
  });
}

module.exports = {
  addNote,
  getSingleNote,
  deleteSingleNote,
  updateSingleNote
};