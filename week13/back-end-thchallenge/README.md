# Backend take home exercise

here is the [link](https://github.com/Techtonica/curriculum/blob/master/projects/take-home-problems/backend.md) to the assignment page

Table of contents:

1. [Install](#install)

2. [Endpoints](#endpoints)

3. [How I built this](#how-i-built-this)

## Install

1. fork and clone the repo

2. navigate to the root folder

3. run `npm install` to install the dependencies

4. run `npm start` to start the server

5. in order to properly run the program, populate the data by following [step 2 - 8](#how-i-built-this)

## Endpoints

1.  Search the addresses a contractor have worked on, limit 10 data per page

    `GET /api/report/properties/search`

    Query parameters:

    a. `companyName` (required)

    b. `page` (optional: if no page is specified in the query params, the default is page 1)

    Examples:

    ```
    curl -X GET \
    "http://localhost:3001/api/report/properties/search?companyName=Mcclure%20Electric%20Inc&page=1"

    curl -X GET \
    "http://localhost:3001/api/report/properties/search?companyName=North%20Construction%20Service%20Inc&page=1"

    curl -X GET \
    "http://localhost:3001/api/report/properties/search?companyName=Hp%20Communications%20Inc"

    curl -X GET \
    "http://localhost:3001/api/report/properties/search?companyName=Rod%20Muscio%20Electrical"
    ```
    
2.  Search the contact of all the contractors working in a given block on a given date

    `GET /api/report/contractor/search`

    Query parameters:

    a. `block` (required)

    b. `date` accepted format is `yyyy-mm-dd` (optional: if no date is specified in the query params, the default is today's date) 

    Examples:

    ```
    curl -X GET \
    "http://localhost:3001/api/report/contractor/search?block=3723&date=2018-01-01"
    ```

## How I built this

1.  create a root folder, eg. `back-end-challenge` and go inside the folder

2.  create folder eg `csv-files` inside the root folder

3.  go inside folder `csv-files` and download the csv files

    ```
    curl "https://data.sfgov.org/api/views/ftty-kx6y/rows.csv?accessType=DOWNLOAD" > Electrical_Permits.csv
    curl "https://data.sfgov.org/api/views/fdm7-jqqf/rows.csv?accessType=DOWNLOAD" > Electrical_Permits_Contacts.csv
    curl "https://data.sfgov.org/api/views/4zuq-2cbe/rows.csv?accessType=DOWNLOAD" > Fire_Violations.csv
    ```

4.  navigate to the root folder and type `sqlite3` to open sqlite3 interface

5.  create tables `permits`, `contacts` and `fire_violations`

    ```sql
    CREATE TABLE permits(
      "Permit Number" TEXT,
      "Application Creation Date" TEXT,
      "Block" TEXT,
      "Lot" TEXT,
      "Street Number" TEXT,
      "Street Number Suffix" TEXT,
      "Street Name" TEXT,
      "Street Suffix" TEXT,
      "Unit" TEXT,
      "Unit Suffix" TEXT,
      "Description" TEXT,
      "Status" TEXT,
      "Filed Date" TEXT,
      "Issued Date" TEXT,
      "Completed Date" TEXT,
      "Permit Valuation" TEXT,
      "Neighborhoods - Analysis Boundaries" TEXT,
      "Supervisor District" TEXT,
      "Zipcode" TEXT,
      "Location" TEXT
    );

    CREATE TABLE contacts(
      "Permit Number" TEXT,
      "Contact Type" TEXT,
      "Company Name" TEXT,
      "Street Number" TEXT,
      "Street" TEXT,
      "Street Suffix" TEXT,
      "State" TEXT,
      "Zipcode" TEXT,
      "Phone" TEXT,
      "Phone2" TEXT
    );

    CREATE TABLE fire_violations(
      "Violation Id" TEXT,
      "Primary" TEXT,
      "Violation Number" TEXT,
      "Violation Date" TEXT,
      "Violation Item" TEXT,
      "Violation Item Description" TEXT,
      "Citation Number" TEXT,
      "Corrective Action" TEXT,
      "Inspection Number" TEXT,
      "Address" TEXT,
      "Zipcode" TEXT,
      "Battalion" TEXT,
      "Station Area" TEXT,
      "Fire Prevention District" TEXT,
      "Status" TEXT,
      "Close Date" TEXT,
      "Supervisor District" TEXT,
      "Neighborhood  District" TEXT,
      "Location" TEXT
    );
    ```

6. set the mode to CSV to instruct the command-line shell program to interpret the input file as a CSV file by typing `.mode csv`

7. import the data from the downloaded cvs files to the database

    ```sql
    .import ./csv-files/Electrical_Permits.csv permits
    .import ./csv-files/Electrical_Permits_Contacts.csv contacts
    .import ./csv-files/Fire_Violations.csv fire_violations
    ```

8.  type `.save ./backend-challenge.sqlite3` to save the imported data with the name backend-challenge.sqlite3

    type `.quit` to quit sqlite3

9.  type `npm init -y` to initialize a nodejs project
   
    modify package.json 
    
    ```json
    "scripts": {
      "start": "node index.js"
    },
    ```

10. type `npm install --save express cors sqlite3` to install dependencies

11. create folder `database` and file `AppDAO.js` inside the folder

    ```javascript
    const sqlite3 = require('sqlite3').verbose();
    const Promise = require('bluebird');

    const dbFilePath = './backend-challenge.sqlite3'; //this will be the path and name of the physical db file

    class AppDAO {
      constructor() {
        this.db = new sqlite3.Database(dbFilePath, sqlite3.OPEN_READONLY, (err) => {
          if (err) {
            console.log('Could not connect to database', err)
          } else {
            console.log('Connected to database')
          }
        });
      }

      // select multiple rows of data from one or more tables
      all(sql, params = []) {
        return new Promise((resolve, reject) => {
          this.db.all(sql, params, (err, rows) => {
            if (err) {
              console.log('Error running sql ' + sql);
              console.log(err);
              reject(err);
            } else {
              resolve(rows);
            }
          });
        });
      }

    }

    module.exports = AppDAO;
    ```

12. go to root folder and create file `index.js` as a starter file

    ```javascript
    const express = require('express');
    const cors = require('cors');
    const router = require('./routes/index');
    const PORT = 3001 || process.env.PORT;

    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());

    app.use(router);

    app.get('*', (req, res) => {
      res.json({ msg: 'Welcome' })
    });

    app.listen(PORT, () => console.log(`listening on port ${PORT}`));
    ```

13. create folder `routes` and create file `index.js` inside the folder

    ```javascript
    const Router = require('express').Router;
    const AppDAO = require('../database/AppDAO');

    const router = new Router();
    const db = new AppDAO();

    const DEFAULT_PAGE = 1;
    const DATA_PER_PAGE = 10;


    router.get('/api/report/properties/search', (req, res, next) => {
      let { companyName, page } = req.query;

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
    ```

## Author

__Mega__ 

October 2019
