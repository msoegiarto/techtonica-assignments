const eventfulKey = require("./keys.js").eventful;
const eventful = require('eventful-node');
const client = new eventful.Client(eventfulKey);

function searchEventsFunction(optionsObj, callBackFn) {
  client.searchEvents(
    {
      keywords: optionsObj.keywords,
      location: optionsObj.location,
      date: optionsObj.date
    }, function (err, data) {
      if (err) {
        return console.error(err);
      }

      let resultEvent = data.search.events.event[0];
      console.log('Event listings: ');
      console.log("===========================================================")
      console.log('title: ', resultEvent.title);
      console.log('start_time: ', resultEvent.start_time);
      console.log('venue_name: ', resultEvent.venue_name);
      console.log('venue_address: ', resultEvent.venue_address);

      callBackFn(resultEvent);
    });
}

module.exports = { searchEventsFunction };