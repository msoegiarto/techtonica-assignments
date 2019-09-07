const db = require('../config/database');
const Router = require('express').Router;

const router = new Router();

/**
 * @route       GET /api/eventonica/users
 * @description display all users
 */
router.get('/', (req, res, next) => {
  db.query(`SELECT * FROM "Users"`, (error, result) => {
    if (error) return next(error);

    res.send(result.rows);
  });
});

/**
 * @route       GET /api/eventonica/users/:id 
 * @description display a single user
 * @param       req.params.id
 */
router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  selectById(id, (error, result) => {
    if (error) return next(error);

    if (result.rows[0]) {
      res.send(result.rows[0]);
    } else {
      res.send({ msg: `Cannot find a user with id=${id}` });
    }
  });
});

/**
 * @route       GET /api/eventonica/users/:id/events
 * @description display all events saved by a single user
 * @param       req.params.id
 */
router.get('/:id/events', (req, res, next) => {
  const query = `SELECT ev.* 
  FROM "Events" AS ev
  INNER JOIN "Users-Events" AS usev ON ev.id = usev.event_id
  INNER JOIN "Users" AS us ON us.id = usev.user_id
  WHERE us.id=$1`;

  db.query(query, [req.params.id], (error, result) => {
    if (error) return next(error);

    res.send(result.rows);
  });
});

/**
 * @route       POST /api/eventonica/users/
 * @description save a user
 * @param       req.body.username
 */
router.post('/', (req, res, next) => {
  const { username } = req.body;
  
  db.query(`INSERT INTO "Users" (username) VALUES ($1)`, [username], (error, result) => {
    if (error) {
      res.send({ msg: error.detail });
      return next(error);
    }

    selectByUsername(username, (error2, result2) => {
      if (error2) return next(error2);
      res.send(result2.rows[0]);
    });
  });
});

/**
 * @route       POST /api/eventonica/users/:id/events
 * @description save an event for a single user
 * @param       req.params.id
 * @param       req.body.title
 */
router.post('/:id/events', (req, res, next) => {
  const query = `WITH temp_table AS (
    SELECT us.id as user_id, ev.id as event_id
    FROM "Users" as us
    INNER JOIN "Events" as ev ON TRUE
    WHERE us.id=$1
    AND ev.title=$2
    )
    INSERT INTO "Users-Events"(user_id, event_id) select * from temp_table;`;

  const id = req.params.id;
  const { title } = req.body;

  db.query(query, [id, title], (error, result) => {
    if (error) return next(error);
    res.send({msg: `${title} has been saved by user`});
  });
});

/**
 * @route       PUT /api/eventonica/users/
 * @description update a user
 * @param       req.params.id
 * @param       req.body.username
 */
router.put('/:id', (req, res, next) => {
  const id = req.params.id;
  const { username } = req.body;
  db.query(`UPDATE "Users" SET username=$1 WHERE id=$2`, [username, id], (error, result) => {
    if (error) {
      res.send({ msg: error.detail });
      return next(error);
    }

    selectByUsername(username, (error2, result2) => {
      if (error2) return next(error2);
      res.send(result2.rows[0]);
    });
  });
});

/**
 * @route       DELETE /api/eventonica/users/
 * @description delete a user
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
      res.send({ msg: `Cannot find a user with id=${id}` });
      return next();
    }

    db.query(`DELETE FROM "Users" WHERE id=$1`, [id], (error2, result2) => {
      if (error2) return next(error2);

      res.send(result.rows[0]);
    });
  });
});

const selectById = (id, callbackFn) => {
  db.query(`SELECT * FROM "Users" WHERE id=$1`, [id], (error, result) => {
    callbackFn(error, result);
  });
}

const selectByUsername = (username, callbackFn) => {
  db.query(`SELECT * FROM "Users" WHERE username=$1`, [username], (error, result) => {
    callbackFn(error, result);
  });
}

module.exports = router;