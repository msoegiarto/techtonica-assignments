const queries = require('../queries/index');
const routes = app => {
  //app.get('/', Articles.list); // API route for listing all articles without comments

  app.get('/users', queries.getUsers);

  app.get('/users/:id', queries.getSingleUserById);

  app.post('/users', queries.createUser);

  app.get('/events', queries.getEvents);

  app.get('/events/:id', queries.getSingleEventById);

  app.get('/events/search/:keywords', queries.searchEvents);

  app.post('/events', queries.saveEvent);

  app.post('/userevents', queries.saveUserEvent);

  app.get('/users/:id/events', queries.getUserEvents);

  app.get('/events/:id/users', queries.saveEventAttendees);
}

module.exports = routes;