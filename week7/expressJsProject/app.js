const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // path is inside core package
const { check, validationResult } = require('express-validator');

const app = express();

//  Logger middleware, has to be set before route handler
//  const logger = function(req, res, next){
//    console.log('logging...');
//    next();
//  }
//  app.use(logger);

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // specify directory used for views

// Body Parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set static Path
app.use(express.static(path.join(__dirname, 'public'))); //specify directory named 'public' as the place to store static pages

// Global vars
app.use(function (req, res, next) {
  res.locals.errors = null;
  res.locals.newUser = null;
  res.locals.blogPosts = null;
  next();
});

app.get('/', function (req, res) {
  res.send('Helloooooo');
});

app.get('/testJson', function (req, res) {
  const person = {
    name: 'Jeff',
    age: 30
  }

  res.json(person);
});

app.get('/testArray', function (req, res) {
  const people = [
    {
      name: 'Jeff',
      age: 30
    },
    {
      name: 'Ann',
      age: 40
    },
    {
      name: 'Andy',
      age: 50
    }
  ];

  res.json(people);
});

const users = [
  {
    id: 1,
    username: 'user1john',
    first_name: 'John',
    email: 'johndoe@email.com'
  },
  {
    id: 2,
    username: 'user2jane',
    first_name: 'Jane',
    email: 'janedoe@email.com'
  },
  {
    id: 3,
    username: 'user3joe',
    first_name: 'Joe',
    email: 'joedoe@gmail.com'
  }
];
app.get('/ejs', function (req, res) {
  res.render('index', {
    title: 'Customer',
    users: users
  });
});

app.post('/ejs/addUser', [
  check('username').isLength({ min: 8 }).withMessage('Username must be at least 8 chars long'),
  check('firstName').isLength({ min: 1 }).withMessage('First name cannot be empty'),
  check('email').isEmail().withMessage('Invalid email')
], function (req, res) {
  console.log('FORM SUBMITTED');

  // Finds the validation errors in this request and wraps them in an object with handy functions
  const validationResults = validationResult(req);
  if (!validationResults.isEmpty()) {
    console.log('HAS ERROR', validationResults);

    res.render('index', {
      title: 'Customer',
      users: users,
      errors: validationResults.errors
    });

    // return res.status(422).json({ errors: errors.array() });
  } else {
    console.log('SUCCESS');

    var newUser = {
      username: req.body.username,
      firstName: req.body.firstName,
      email: req.body.email
    };
    console.log('new user = ', newUser);

    res.render('index', {
      title: 'Customer',
      users: users,
      newUser: newUser
    });
    // res.redirect(303, '/ejs');
  }
});

app.get('/blog', function (req, res) {
  res.render('blog', {
    title: 'My blog'
  });
});

app.post('/blog/addPost', [
  check('postTitle').isLength({ min: 1 }).withMessage('Title cannot be empty'),
  check('postBody').isLength({ min: 1 }).withMessage('Post cannot be empty'),
], function (req, res) {
  const validationResults = validationResult(req);
  if (!validationResults.isEmpty()) {
    console.log('HAS ERROR', validationResults);

    res.render('blog', {
      title: 'My blog',
      errors: validationResults.errors
    });
  } else {
    var newBlogPost = {
      postTitle: req.body.postTitle,
      postBody: req.body.postBody
    }

    res.render('blog', {
      title: 'My blog',
      blogPosts: newBlogPost
    });
  }
});

app.get('/shop', function (req, res) {
  const items = [
    {
      itemName: 'Item1',
      itemPrice: 13
    },
    {
      itemName: 'Item2',
      itemPrice: 94
    },
    {
      itemName: 'Item3',
      itemPrice: 65
    },
    {
      itemName: 'Item4',
      itemPrice: 26
    },
    {
      itemName: 'Item5',
      itemPrice: 87
    },
    {
      itemName: 'Item6',
      itemPrice: 42
    },
  ];
  res.render('shop', {
    items: items
  });
});

app.listen(3000, function () {
  console.log('Server started on port 3000');
});
