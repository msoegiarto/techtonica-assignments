# Simple API with mongoDB

made for [this](https://github.com/Techtonica/curriculum/blob/master/databases/mongo-db.md) assignment: Independent practice, part 2.

# Built with

[node](https://nodejs.org/en/)

[express](https://expressjs.com/)

[mongoDB](https://www.mongodb.com/)

# Database

1. This API is using local mongoDB database.

2. install mongoDB with [homebrew](https://brew.sh/)

   tap [mongoDB homebrew tap](https://github.com/mongodb/homebrew-brew)

      brew tap mongodb/brew

      brew install mongodb-community

3. Run mongoDB as macOS service

      brew services start mongodb-community

4. Connect to mongoDB (after step number 3)

      mongo

   Quit mongoDB

      exit

5. Stop mongoDB service

      brew services stop mongodb-community

6. My database for this project:

    a. url = mongodb://127.0.0.1:27017/

    b. db = mega-test

    c. collection = mycols

# Endpoint

1. add an item

      POST http://localhost:3000/notes/

      {
        "name":"example_new_name",
        "title":"example_new_title"
      }

2. display a single item

      GET http://localhost:3000/notes/:id

3. delete a single item

      DELETE http://localhost:3000/notes/:id

4. update a single item

      PUT http://localhost:3000/notes/:id

      {
        "name":"example_update_name",
        "title":"example_update_title"
      }

#### Author

__Mega__