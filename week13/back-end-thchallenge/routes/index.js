const Router = require('express').Router;
const AppDAO = require('../database/AppDAO');

const router = new Router();
const db = new AppDAO();

const DEFAULT_PAGE = 1;
const DATA_PER_PAGE = 10;


router.get('/api/report/properties/search', (req, res, next) => {
  let { companyName, page } = req.query;
  // console.log('companyName:', companyName, '|| page:', page);

  page = page || DEFAULT_PAGE;
  const paginationStart = (page - 1) * DATA_PER_PAGE;
  const paginationEnd = page * DATA_PER_PAGE;

  db.all(
    `SELECT * FROM (
      SELECT ROW_NUMBER() OVER () rownum, b.* FROM (
        SELECT DISTINCT
          c."Address", c."Zipcode",  c."Violation Item Description"
        FROM contacts AS a 
        INNER JOIN permits AS b ON a."Permit Number" = b."Permit Number"
        INNER JOIN fire_violations AS c ON b."Location" = c."Location"
        WHERE a."Company Name"=?
        AND b."Status" NOT IN ('cancelled', 'withdrawn')
        AND strftime('%Y-%m-%d', substr(c."Close Date" ,7) || '-' || 
	        substr(c."Close Date", 1, 2) || '-' || 
          substr(c."Close Date", 4, 2)) <
          strftime('%Y-%m-%d', substr(b."Filed Date", 7) || '-' || 
	        substr(b."Filed Date", 1, 2) || '-' || 
	        substr(b."Filed Date", 4, 2))
      )b
    )t
    WHERE t.rownum > ? AND t.rownum <= ?; `,
    [companyName, paginationStart, paginationEnd])
    .then(rows => {
      res.send({ counter: rows.length, addresses: rows });
    });

});

router.get('/api/report/contractor/search', (req, res, next) => {
  let { block, date } = req.query;
  date = date || new Date().toISOString().slice(0,10);
  // console.log('block:', block, '|| date:', date);

  db.all(`
    SELECT count( DISTINCT a."Permit Number") as "Permit Counter",  
      a."Company Name", a."Phone", a."Phone2", (a."Street Number" || ' ' || 
      a."Street" || ' ' || a."Street Suffix" || ', ' || a."State" || ' ' || 
      a."Zipcode") as address 
    FROM contacts AS a 
    INNER JOIN permits AS b ON a."Permit Number" = b."Permit Number"
    INNER JOIN fire_violations AS c ON b."Location" = c."Location"
    WHERE b."Block"=?
    AND strftime('%Y-%m-%d', substr(b."Issued Date", 7) || '-' || 
      substr(b."Issued Date", 1, 2) || '-' || 
      substr(b."Issued Date", 4, 2)) > 
      strftime('%Y-%m-%d', ?)
    AND b."Status" NOT IN ('cancelled', 'withdrawn')
    AND (b."Completed Date" = '' OR b."Completed Date" IS NULL)
    GROUP BY a."Company Name";`,
    [block, date])
    .then(rows => {
      let totalPermit = 0;

      rows.forEach(row => {
        totalPermit += parseInt(row["Permit Counter"]);
        console.log('totalPermit:', totalPermit);
      });

      res.send({ totalPermit, companies: rows });
    });
});


module.exports = router;