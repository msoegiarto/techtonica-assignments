class Events {
  constructor(eventName, eventDescription, eventDate) {
    this.eventName = eventName;
    this.eventDescription = eventDescription;
    this.eventDate = eventDate;
  }
}
class Users {
  constructor(username, lastName, firstName) {
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.savedEvents = [];
  }
}
class EventRecommender {
  constructor() {
    // All main properties should go here.

    this.events = [];
    this.users = [];

  }

  // Adds a new Event to the System
  addEvent(eventName, eventDescription, eventDate) {
    const event = new Events(eventName, eventDescription, eventDate);
    this.events.push(event);
  }

  // Adds a new User to the System
  addUser(username, lastName, firstName) {
    const user = new Users(username, lastName, firstName);
    this.users.push(user);
  }

  //Allow users to save events to a personal Events array.
  saveUserEvent(user, event) {
    const index = this.findTheIndex(user, this.users);
    this.users[index].savedEvents.push(event);
  }

  // Deletes a User from the system
  deleteUser(userToBeDeleted) {
    const indexToBeDeleted = this.findTheIndex(userToBeDeleted, this.users);
    delete this.users[indexToBeDeleted];
    this.users.splice(indexToBeDeleted, 1);
  }

  deleteEvent(eventToBeDeleted) {
    const indexToBeDeleted = this.findTheIndex(eventToBeDeleted, this.events);
    delete this.events[indexToBeDeleted];
    this.events.splice(indexToBeDeleted, 1);
  }

  filterByDate(fromDate, toDate) {
    const result = [];
    for (let obj of this.events) {
      if (obj.eventDate >= fromDate && obj.eventDate <= toDate) {
        result.push(obj);
      }
    }
    return result;
  }

  findTheIndex(obj, objArray) {
    return objArray.findIndex(element => element === obj);
  }

}

// add users and events
const eventRecommender = new EventRecommender();
eventRecommender.addUser('user1', 'Mega', 'Mega');
eventRecommender.addUser('user2', 'Alicia', 'Alicia');
eventRecommender.addUser('user3', 'Lilia', 'Lilia');
eventRecommender.addEvent('Event1', 'this is event1', new Date(2019, 9, 20, 15, 30, 00));
eventRecommender.addEvent('Event2', 'this is event2', new Date("November 18, 2019"));
eventRecommender.addEvent('Event3', 'this is event3', new Date(2019, 11, 17, 11));

// save an event to user personal events array
eventRecommender.saveUserEvent(eventRecommender.users[0], eventRecommender.events[0]);
eventRecommender.saveUserEvent(eventRecommender.users[0], eventRecommender.events[2]);
eventRecommender.saveUserEvent(eventRecommender.users[2], eventRecommender.events[2]);

module.exports = {
  EventRecommender,
  Events,
  Users
};