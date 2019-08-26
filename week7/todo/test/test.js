var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:3000");

// UNIT test begin

describe("SAMPLE unit test",function(){

  it("GET / should return home page",function(done){
    // calling home page api
    server
    .get("/")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
      // Error key should be false.
      res.body.error.should.equal(false);
      done();
    });
  });

  it("GET /all should return todo items as JSON on success", function (done) {
    server
      .get("/all")
      .expect("Content-type", /json/)
      .expect(200) // THis is HTTP response
      .end(function (err, res) {
        // console.log('res.body ', res.body);
        
        // HTTP status should be 200
        res.status.should.equal(200);
        // Should only 1 item exists.
        res.body.length.should.equal(1);
        done();
      });
  });

  it("GET /:id should return todo item for certain id as JSON on success", function (done) {
    server
      .get("/1")
      .expect("Content-type", /json/)
      .expect(200) // THis is HTTP response
      .end(function (err, res) {
        console.log('res.body ', res.body);
        
        // HTTP status should be 200
        res.status.should.equal(200);
        // Should only 1 item exists.
        res.body.length.should.equal(1);
        done();
      });
  });

  it("POST /add should add item",function(done){
    //calling ADD api
    server
    .post('/add')
    .send({entry: 'some text here'})
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(201);
      console.log('res.body = ', res.body);
      // res.body.should.equal(`User added with ID: ${results.insertId}`);
      done();
    });
  });

});


describe("POST /save",function(){


  

});