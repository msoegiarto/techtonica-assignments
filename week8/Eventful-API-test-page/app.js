const inquirer = require('inquirer');
//connection available to all
const connection = require('./connection');

const eventfulApi = require('./eventfulAPI');

const app = {};

app.startQuestion = () => {
  inquirer.prompt({
    type: 'list',
    message: 'What action would you like to do?',
    choices: [
      'Complete a sentence',
      'Create a new user',
      'Find one event of a particular type in San Francisco next week',
      'Mark an existing user to attend an event in database',
      'See all events that a particular user is going to',
      'See all the users that are going to a particular event',
      'Exit'
    ],
    name: 'action',
  }).then((res) => {
    const continueCallback = () => app.startQuestion();
    const quitProgramCallback = () => app.promptQuitProgram(continueCallback);

    if (res.action === 'Complete a sentence')
      app.completeSentence(quitProgramCallback);

    if (res.action === 'Create a new user')
      app.createNewUser(quitProgramCallback);

    if (res.action === 'Find one event of a particular type in San Francisco next week')
      app.searchEventful(quitProgramCallback);

    if (res.action === 'Mark an existing user to attend an event in database')
      app.matchUserWithEvent(quitProgramCallback);

    if (res.action === 'See all events that a particular user is going to')
      app.seeEventsOfOneUser(quitProgramCallback);

    if (res.action === 'See all the users that are going to a particular event')
      app.seeUsersOfOneEvent(quitProgramCallback);

    if (res.action === 'Exit')
      quitProgramCallback();

  })
}

app.completeSentence = (quitProgramCallback) => {
  //YOUR WORK HERE
  const questions = [
    {
      type: 'input',
      message: 'What is your name? ',
      name: 'input1',
    }, {
      type: 'input',
      message: 'What is your favorite color? ',
      name: 'input2',
    }
  ];

  inquirer.prompt(questions).then(res => {
    printInformation(`${res.input1}'s favorite color is ${res.input2}`);
    quitProgramCallback();
  });
  //End of your work
}

app.createNewUser = (quitProgramCallback) => {
  //YOUR WORK HERE
  inquirer.prompt({
    type: 'input',
    message: 'Input username: ',
    name: 'input',
  }).then(res => {

    connection.query('INSERT INTO "Users" (username) VALUES ($1)', [res.input])
      .then(res2 => {
        printInformation(`User ${res.input} has been successfully inserted`);
        connection.query('SELECT * FROM "Users" ORDER BY id ASC')
          .then(results => {
            console.log(results.rows);
            quitProgramCallback();
          });
      })
      .catch(err => setImmediate(() => {
        console.log(err.detail);
        quitProgramCallback();
      }));

  });
  //End of your work
}

app.searchEventful = (quitProgramCallback) => {
  //YOUR WORK HERE
  const continueSearch = results => continueSearchEvents(results, quitProgramCallback);

  const eventfulAPISearch = res => eventfulApi.searchEventsFunction(res, continueSearch);

  promptInputSearchKeywords(eventfulAPISearch);
  //End of your work
}

app.matchUserWithEvent = (quitProgramCallback) => {
  //YOUR WORK HERE
  const insert = (user, event) => insertIntoUsersEventsTable(user, event, quitProgramCallback);

  const chooseEvent = username => promptChooseEvent(username, insert);

  promptChooseUser(chooseEvent);
  //End of your work
}

app.seeEventsOfOneUser = (quitProgramCallback) => {
  //YOUR WORK HERE
  const showEvents = username => showUserEvents(username, quitProgramCallback);

  promptChooseUser(showEvents);
  //End of your work
}

app.seeUsersOfOneEvent = (quitProgramCallback) => {
  //YOUR WORK HERE
  const showUsers = eventTitle => showEventUsers(eventTitle, quitProgramCallback);

  promptChooseEvent(null, showUsers);
  //End of your work
}

app.promptQuitProgram = (continueCallback) => {
  inquirer.prompt({
    type: 'confirm',
    message: 'Do you want to quit the program ? ',
    name: 'input',
    default: false
  }).then(res => {
    if (res.input) {
      console.log(`
      /$$$$$$                            /$$       /$$                          
     /$$__  $$                          | $$      | $$                          
    | $$   _/   /$$$$$$   /$$$$$$   /$$$$$$$      | $$$$$$$  /$$   /$$  /$$$$$$ 
    | $$ /$$$$ / $$__ $$ /$$__  $$ /$$__  $$      | $$__  $$| $$  | $$ /$$__  $$
    | $$|_  $$| $$    $$| $$    $$| $$  | $$      | $$    $$| $$  | $$| $$$$$$$$
    | $$    $$| $$  | $$| $$  | $$| $$  | $$      | $$  | $$| $$  | $$| $$_____/
    |  $$$$$$/|  $$$$$$/|  $$$$$$/|  $$$$$$$      | $$$$$$$/|  $$$$$$$|  $$$$$$$
      ______/    _____/    _____/    ______/      |_______/   ____  $$  ______/
                                                             /$$  | $$          
                                                            |  $$$$$$/          
                                                              ______/           
    `);
      process.exitCode = 0;
      process.exit();
    } else {
      continueCallback();
    }
  });
}

const continueSearchEvents = (result, quitProgramCallback) => {

  if (!result) {
    promptSearchAgain(quitProgramCallback);
  } else {
    inquirer.prompt({
      type: 'confirm',
      message: 'Would you like to save the result? ',
      name: 'input',
      default: true
    }).then(res => {

      if (res.input) {
        insertEvent(result, quitProgramCallback);
      } else {
        promptSearchAgain(quitProgramCallback);
      }
    });
  }
}

const promptSearchAgain = (quitProgramCallback) => {
  inquirer.prompt({
    type: 'confirm',
    message: 'Search again? ',
    name: 'input',
    default: true
  }).then(res => {
    if (res.input) {
      app.searchEventful(quitProgramCallback);
    } else {
      quitProgramCallback();
    }
  });
}

const insertEvent = (event, quitProgramCallback) => {
  connection.query('INSERT INTO "Events" (title, start_time, venue_name, venue_address) VALUES ($1, $2, $3, $4)', [event.title, event.start_time, event.venue_name, event.venue_address])
    .then(res => {
      printInformation('Event has been saved');
      quitProgramCallback();
    })
    .catch(err => setImmediate(() => {
      console.error(err.detail);
      quitProgramCallback();
    }));
}

const promptInputSearchKeywords = callbackFn => {
  const questions = [{
    type: 'input',
    message: 'Input search keyword: ',
    name: 'input',
    default: 'tango'
  }];

  const inputKeywords =
  {
    'location': 'San Francisco',
    'date': 'Next Week'
  };

  inquirer.prompt(questions).then(res => {
    inputKeywords.keywords = res.input;
    callbackFn(inputKeywords);
  })

}

const promptChooseEvent = (user, callbackFn) => {
  const question = {
    type: 'list',
    message: 'Please choose event',
    choices: ['Cancel'],
    name: 'input',
  };

  connection.query('SELECT * FROM "Events" ORDER BY id ASC')
    .then(results => {
      for (let i = 0; i < results.rows.length; i++) {
        question.choices.push(results.rows[i].title);
      }

      inquirer.prompt(question).then(res => {
        if (res.input === 'Cancel') {
          app.startQuestion();
        } else {
          printInformation('Event', res.input, 'has been chosen');
          if (user) {
            callbackFn(user, res.input);
          } else {
            callbackFn(res.input);
          }
        }
      });
    });
}

const promptChooseUser = (callbackFn) => {
  const question = {
    type: 'list',
    message: 'Please choose user',
    choices: ['Cancel'],
    name: 'input',
  };

  connection.query('SELECT * FROM "Users" ORDER BY id ASC')
    .then(results => {
      for (let i = 0; i < results.rows.length; i++) {
        question.choices.push(results.rows[i].username);
      }

      inquirer.prompt(question).then(res => {
        if (res.input === 'Cancel') {
          app.startQuestion();
        } else {
          printInformation('User', res.input, 'has been chosen');
          callbackFn(res.input);
        }
      });
    });
}

const insertIntoUsersEventsTable = (username, event, callbackFn) => {
  const query = `WITH temp_table AS ( 
    SELECT us.id as user_id, ev.id as event_id 
    FROM "Users" as us 
    INNER JOIN "Events" as ev ON TRUE 
    WHERE us.username=$1 
    AND ev.title=$2 
    ) 
    INSERT INTO "Users-Events"(user_id, event_id) select * from temp_table;`;

  connection.query(query, [username, event])
    .then(res => {
      printInformation('User and Event have been successfully inserted');
      callbackFn();
    })
    .catch(err => {
      setImmediate(() => {
        console.error(err.detail);
        callbackFn();
      });
    });
}

const showUserEvents = (username, quitProgramCallback) => {
  const query = `SELECT ev.* FROM "Events" AS ev 
  INNER JOIN "Users-Events" AS usev ON ev.id = usev.event_id 
  INNER JOIN "Users" AS us ON us.id = usev.user_id 
  WHERE us.username=$1`;

  connection.query(query, [username])
    .then(res => {
      const rows = res.rows;
      console.log(`Event listings for user ${username}: `);
      for (let i = 0; i < rows.length; i++) {
        console.log("===========================================================");
        console.log('title: ', rows[i].title);
        console.log('start_time: ', rows[i].start_time);
        console.log('venue_name: ', rows[i].venue_name);
        console.log('venue_address: ', rows[i].venue_address);
      }
      quitProgramCallback();
    })
    .catch(err => {
      console.error(err.detail);
      quitProgramCallback();
    });
}

const showEventUsers = (eventTitle, quitProgramCallback) => {
  const query = `SELECT us.* FROM "Users" AS us 
  INNER JOIN "Users-Events" AS usev ON us.id = usev.user_id 
  INNER JOIN "Events" AS ev ON ev.id = usev.event_id 
  WHERE ev.title=$1`;

  connection.query(query, [eventTitle])
    .then(res => {
      const rows = res.rows;
      console.log(`Attendees for this event: `);
      console.log("===========================================================");
      for (let i = 0; i < rows.length; i++) {
        console.log(i + 1, 'username: ', rows[i].username);
      }
      quitProgramCallback();
    })
    .catch(err => {
      console.error(err.detail);
      quitProgramCallback();
    });
}

const printInformation = (...text) => {
  //note: arg1 = bgColor; arg2 = fgColor; arg(n) = reset
  console.log('\x1b[46m', '\x1b[30m', ...text, '\x1b[0m');
}

module.exports = app;