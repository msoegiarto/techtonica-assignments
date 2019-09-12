const http = require('http');
const qs = require('querystring');

// Need to have installed these as deps
const express = require('express');
const cors = require('cors');

// TODO: You will need to insert put your Eventful API key in
//       the the EVENTFUL_API_KEY env variable or use dotenv.
const key = process.env.EVENTFUL_API_KEY;
const port = 5001;
const searchUrl = 'http://api.eventful.com/json/events/search';

express()
  .use(cors())
  .use(express.json())
  .get('/events', (req, res) => searchEvents(req.query).then(evs => res.json(evs)))
  .listen(port, () => console.log(`Evenful API listening on ${port}`));

function searchEvents(params) {
  let query = qs.stringify(Object.assign({app_key: key}, params));
  let url = `${searchUrl}?${query}`;

  return new Promise((resolve) => http.get(url, resp => {
    let data = '';
    resp.on('data', chunk => data += chunk).on('end', () => {
      const { events } = JSON.parse(data);
      resolve(events ? events.event : []);
    });
  }));
}