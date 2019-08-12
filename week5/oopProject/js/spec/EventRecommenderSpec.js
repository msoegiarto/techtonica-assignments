describe("EventRecommender", () => {
  const { EventRecommender, Users, Events } = require('../EventRecommender.js');
  
  let er;

  beforeEach(() => {
    er = new EventRecommender();
  });

  describe("addEvent", () => {
    it("adds a new Event to the system", () => {
      er.addEvent("Change Me", "the description", new Date(2019, 7, 12));
      expect(er.events.length).toEqual(1);
      expect(er.events[0].eventName).toEqual("Change Me"); // what are some other things you can test?
      expect(er.events[0].eventDescription).toEqual("the description");
    });
  });
  
  describe("addUser", () => {
    it("adds a new User to the system", () => {
      er.addUser("test", "test", "test");
      expect(er.users.length).toEqual(1);
    });
  });
    
  describe("saveUserEvent", () => {
    it("adds an event to a user's personal event array", () => {
      er.addEvent("Change Me", "the description", new Date(2019, 7, 12));
      er.addUser("test", "test", "test");
      er.saveUserEvent(er.users[0], er.events[0]); // change these to match your method signature
      expect(er.users[0].savedEvents.length).toEqual(1);
    });
  });
    
  describe("deleteUser", () => {
    it("removes a User from the system", () => {
      er.addUser("test", "test", "test");
      er.deleteUser(new Users("test", "test", "test"));
      expect(er.users.length).toEqual(0);
    });
  });
    
  describe("deleteEvent", () => {
    it("removes the event from the system", () => {
      er.addEvent("Change Me", "the description", new Date(2019, 7, 12));
      er.deleteEvent(new Events("Change Me", "the description", new Date(2019, 7, 12)));
      expect(er.events.length).toEqual(0);
    });
  });
});