const db = require('../config/database');
const eventful = require('eventful-node');
const client = new eventful.Client(process.env.EVENTFUL_API_KEY);

const Router = require('express').Router;

const router = new Router();

/**
 * @route       GET /api/eventonica/events/search?keywords=keywords
 * @description search events using eventful-api
 * @param       req.query.keywords
 */
router.get('/search', (req, res, next) => {
  try {
    // console.log(req.query);
    const { keywords } = req.query;

    searchEventfulApi(keywords, searchResult => {
      res.json(searchResult);
    });

  } catch (error) {
    res.send(error.detail);
    return next();
  }
});

/**
 * @route       GET /api/eventonica/events
 * @description display all events
 */
router.get('/', (req, res, next) => {
  db.query(`SELECT * FROM "Events"`, (error, result) => {
    if (error) return next(error);

    res.send(result.rows);
  });
});

/**
 * @route       GET /api/eventonica/events/:id 
 * @description display a single event
 * @param       req.params.id
 */
router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  selectById(id, (error, result) => {
    if (error) return next(error);

    if (result.rows[0]) {
      res.send(result.rows[0]);
    } else {
      res.send({ msg: `Cannot find an event with id=${id}` });
    }
  });
});

/**
 * @route       GET /api/eventonica/events/:id/users
 * @description display all attendees of a single event
 * @param       req.params.id
 */
router.get('/:id/users', (req, res, next) => {
  const query = `SELECT us.* 
  FROM "Users" AS us
  INNER JOIN "Users-Events" AS usev ON us.id = usev.user_id
  INNER JOIN "Events" AS ev ON ev.id = usev.event_id
  WHERE ev.id=$1`;

  db.query(query, [req.params.id], (error, result) => {
    if (error) return next(error);

    res.send(result.rows);
  });
});

/**
 * @route       POST /api/eventonica/events/
 * @description save an event
 * @param       req.body.title
 * @param       req.body.start_time
 * @param       req.body.venue_name
 * @param       req.body.venue_address
 */
router.post('/', (req, res, next) => {
  const { title, start_time, venue_name, venue_address } = req.body;
  db.query(`INSERT INTO "Events" (title, start_time, venue_name, venue_address) VALUES ($1, $2, $3, $4)`, [title, start_time, venue_name, venue_address], (error, result) => {
    if (error) {
      res.send({ msg: error.detail });
      return next(error);
    }

    selectByTitle(title, (error2, result2) => {
      if (error2) return next(error2);
      res.send(result2.rows[0]);
    });
  });
});

/**
 * @route       PUT /api/eventonica/events/
 * @description update an event
 * @param       req.params.id
 * @param       req.body.title
 * @param       req.body.start_time
 * @param       req.body.venue_name
 * @param       req.body.venue_address
 */
router.put('/:id', (req, res, next) => {
  const id = req.params.id;
  const { title, start_time, venue_name, venue_address } = req.body;
  db.query(`UPDATE "Events" SET title=$1, start_time=$2, venue_name=$3, venue_address=$4 WHERE id=$5`, [title, start_time, venue_name, venue_address, id], (error, result) => {
    if (error) {
      res.send({ msg: error.detail });
      return next(error);
    }

    selectByTitle(title, (error2, result2) => {
      if (error2) return next(error2);
      res.send(result2.rows[0]);
    });
  });
});

/**
 * @route       DELETE /api/eventonica/events/
 * @description delete an event
 * @param       req.params.id
 */
router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  selectById(id, (error, result) => {
    if (error) {
      res.send({ msg: error.detail });
      return next(error);
    }

    if (!result.rows[0]) {
      res.send({ msg: `Cannot find an event with id=${id}` });
      return next();
    }

    db.query(`DELETE FROM "Events" WHERE id=$1`, [id], (error2, result2) => {
      if (error2) return next(error2);

      res.send(result.rows[0]);
    });
  });
});

const selectById = (id, callbackFn) => {
  db.query(`SELECT * FROM "Events" WHERE id=$1`, [id], (error, result) => {
    callbackFn(error, result);
  });
}

const selectByTitle = (title, callbackFn) => {
  db.query(`SELECT * FROM "Events" WHERE title=$1`, [title], (error, result) => {
    callbackFn(error, result);
  });
}

/**
 * @function    searchEventfulApi
 * @description search events using eventful-api
 * @param       keywords
 * @param       callbackFn
 * @returns     resultEvent
 */
const searchEventfulApi = (keywords, callbackFn) => {
  client.searchEvents({
    keywords: keywords,
    location: 'San Francisco',
    date: 'Next Week'
  }, function (err, data) {
    if (err || data.error) console.error(err, data.error);

    const searchResults = data.search.events.event;

    if (searchResults && Array.isArray(searchResults)) {
      const resultEvent = [];
      for (let i = 0; i < searchResults.length; i++) {
        const simplifiedSearchResult = {
          title: searchResults[i].title,
          start_time: searchResults[i].start_time,
          venue_name: searchResults[i].venue_name,
          venue_address: searchResults[i].venue_address
        }
        resultEvent.push(simplifiedSearchResult);
      }
      callbackFn(resultEvent);

    } else if (searchResults && !Array.isArray(searchResults)) {
      // if the results of the search only consists of 1 item
      // evenful will send a dictionary instead of an array
      const simplifiedSearchResult = [{
        title: searchResults.title,
        start_time: searchResults.start_time,
        venue_name: searchResults.venue_name,
        venue_address: searchResults.venue_address
      }];
      callbackFn(simplifiedSearchResult);

    } else {
      callbackFn({ message: 'There is no such event next week' });
    }
  });
}

module.exports = router;