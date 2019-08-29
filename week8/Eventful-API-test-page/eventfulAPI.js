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
        console.error(err);
      }
      const result = data.search.events;
      if (result) {
        let resultEvent = result.event[0];
        console.log('Event listings: ');
        console.log("===========================================================")
        console.log('title: ', resultEvent.title);
        console.log('start_time: ', resultEvent.start_time);
        console.log('venue_name: ', resultEvent.venue_name);
        console.log('venue_address: ', resultEvent.venue_address);

        callBackFn(resultEvent);
      } else {
        console.log('There is no such event next week');
        callBackFn(null);
      }
    });
}

module.exports = { searchEventsFunction };