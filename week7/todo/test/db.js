const expect = require('chai').expect;
const simple = require('simple-mock');

const dataInit = require('../db.js');

function getMockDB() {
  return {
    query: simple.mock()
  }
}

function testFn() { }

describe('Database calls', () => {
  it('getTodoDB should query for all todo_items', () => {
    const mockDB = getMockDB();
    // const data = dataInit(mockDB);

    dataInit.getAllData();
    // data.getTodoDB(testFn)

    // pull out the mocked query so we can verify it
    const query = mockDB.query
    // ensure it was only called once
    expect(query.callCount).to.equal(1)

    // grab the args that were passed to the last (only) call to db.query
    const callArgs = query.lastCall.args
    expect(callArgs.length).to.equal(2)
    expect(callArgs[0]).to.equal('SELECT id, entry FROM todo_items')
    expect(callArgs[1]).to.equal(testFn)
  })
});