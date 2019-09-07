const users = require('./users');
const events = require('./events');

module.exports = app => {
  app.use('/api/eventonica/users', users);
  app.use('/api/eventonica/events', events);
}