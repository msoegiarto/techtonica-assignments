require('dotenv').config();
const eventful = require('eventful-node');
const client = new eventful.Client(process.env.EVENTFUL_API_KEY);
const Pool = require('pg').Pool;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

const queries = {};

queries.getUsers = (request, response) => {
  pool.query('SELECT * FROM "Users" ORDER BY id ASC', (error, results) => {
    if (error) throw error;

    response.status(200).json(results.rows);
  });
}

queries.getSingleUserById = (request, response) => {
  pool.query('SELECT * FROM "Users" WHERE id=$1', [request.params.id], (error, results) => {
    if (error) throw error;

    response.status(200).json(results.rows);
  });
}

queries.createUser = (request, response) => {
  const { username } = request.body;
  pool.query('INSERT INTO "Users" (username) VALUES ($1)', [username], (error, results) => {
    if (error) throw error;

    pool.query('SELECT * FROM "Users" WHERE username=$1 ', [username], (err, res) => {
      if (err) throw err;

      const confirmation = {
        message: 'User has been saved.',
        id: res.rows[0].id,
        username: res.rows[0].username
      };
      console.log(confirmation);
      response.status(201).json(confirmation);
    });

  });
}

queries.getEvents = (request, response) => {
  pool.query('SELECT * FROM "Events" ORDER BY id ASC', (error, results) => {
    if (error) throw error;

    response.status(200).json(results.rows);
  });
}

queries.getSingleEventById = (request, response) => {
  pool.query('SELECT * FROM "Events" WHERE id=$1', [request.params.id], (error, results) => {
    if (error) throw error;

    response.status(200).json(results.rows);
  });
}

queries.searchEvents = (request, response) => {
  try {
    const sendResponse = searchResult => response.status(200).json(searchResult);
    searchEventfulApi(request.params.keywords, sendResponse);
  } catch (error) {
    throw error;
  }
}

queries.saveEvent = (request, response) => {
  const { title, start_time, venue_name, venue_address } = request.body;

  pool.query('INSERT INTO "Events" (title, start_time, venue_name, venue_address) VALUES ($1, $2, $3, $4)', [title, start_time, venue_name, venue_address], (error, results) => {
    if (error) throw error;

    pool.query('SELECT * FROM "Events" WHERE title=$1', [title], (err, res) => {
      if (error) throw error;
      const confirmation = {
        message: 'Event has been saved.',
        title: res.rows[0].title,
        start_time: res.rows[0].start_time,
        venue_name: res.rows[0].venue_name,
        venue_address: res.rows[0].venue_address
      };
      response.status(201).json(confirmation);
    });

  });
}

queries.saveUserEvent = (request, response) => {
  const query = `WITH temp_table AS ( 
    SELECT us.id as user_id, ev.id as event_id 
    FROM "Users" as us 
    INNER JOIN "Events" as ev ON TRUE 
    WHERE us.username=$1 
    AND ev.title=$2 
    ) 
    INSERT INTO "Users-Events"(user_id, event_id) select * from temp_table;`;

  const { username, title } = request.body;

  pool.query(query, [username, title], (error, result) => {
    if (error) throw error;

    const confirmation = {
      message: 'User and Event have been saved.',
      username: username,
      title: title
    };
    response.status(201).json(confirmation);
  });
}

queries.getUserEvents = (request, response) => {
  const query = `SELECT ev.* FROM "Events" AS ev 
  INNER JOIN "Users-Events" AS usev ON ev.id = usev.event_id 
  INNER JOIN "Users" AS us ON us.id = usev.user_id 
  WHERE us.id=$1`;

  pool.query(query, [request.params.id], (error, results) => {
    if (error) throw error;

    response.status(201).json(results.rows);
  });
}

queries.saveEventAttendees = (request, response) => {
  const query = `SELECT us.* FROM "Users" AS us 
  INNER JOIN "Users-Events" AS usev ON us.id = usev.user_id 
  INNER JOIN "Events" AS ev ON ev.id = usev.event_id 
  WHERE ev.id=$1`;

  pool.query(query, [request.params.id], (error, results) => {
    if (error) throw error;

    response.status(201).json(results.rows);
  });
}

const searchEventfulApi = (keywords, callbackFn) => {
  client.searchEvents({
    keywords: keywords,
    location: 'San Francisco',
    date: 'Next Week'
  }, function (err, data) {
    if (err) console.error(err);

    const searchResults = data.search.events;
    if (searchResults.event) {
      const event = Array.isArray(searchResults.event) ? searchResults.event[0] : searchResults.event;
      const resultEvent = {
        title: event.title,
        start_time: event.start_time,
        venue_name: event.venue_name,
        venue_address: event.venue_address
      }
      callbackFn(resultEvent);
    } else {
      callbackFn({ message: 'There is no such event next week' });
    }
  });
}

module.exports = queries;