const noteRoutes = require('./note_routes');

const routes = app => {
  app.post('/notes', noteRoutes.addNote);

  app.get('/notes/:id', noteRoutes.getSingleNote);

  app.delete('/notes/:id', noteRoutes.deleteSingleNote);

  app.put('/notes/:id', noteRoutes.updateSingleNote);
}

module.exports = routes;