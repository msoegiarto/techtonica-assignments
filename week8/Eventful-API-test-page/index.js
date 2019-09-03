const connection = require('./connection');
const app = require('./app');

const pgConnect = () => {
  connection.connect((err) => {
    if (err) throw err;

    console.log(`
    /$$      /$$           /$$                                                     /$$              
   | $$  /$ | $$          | $$                                                    | $$              
   | $$ /$$$| $$  /$$$$$$ | $$  /$$$$$$$  /$$$$$$  /$$$$$$/$$$$   /$$$$$$        /$$$$$$    /$$$$$$ 
   | $$/$$ $$ $$ /$$__  $$| $$ /$$_____/ /$$__  $$| $$_  $$_  $$ /$$__  $$      |_  $$_/   /$$__  $$
   | $$$$_  $$$$| $$$$$$$$| $$| $$      | $$  \\ $$| $$ \\ $$ \\ $$| $$$$$$$$        | $$    | $$  \\ $$
   | $$$/ \\  $$$| $$_____/| $$| $$      | $$  | $$| $$ | $$ | $$| $$_____/        | $$ /$$| $$  | $$
   | $$/   \\  $$|  $$$$$$$| $$|  $$$$$$$|  $$$$$$/| $$ | $$ | $$|  $$$$$$$        |  $$$$/|  $$$$$$/
   |__/     \\__/ \\_______/|__/ \\_______/ \\______/ |__/ |__/ |__/ \\_______/         \\___/   \\______/                                                                                                  
   `);

    console.log(`
    /$$$$$$$$ /$$    /$$ /$$$$$$$$ /$$   /$$ /$$$$$$$$ /$$$$$$  /$$   /$$ /$$$$$$  /$$$$$$   /$$$$$$ 
   | $$_____/| $$   | $$| $$_____/| $$$ | $$|__  $$__//$$__  $$| $$$ | $$|_  $$_/ /$$__  $$ /$$__  $$
   | $$      | $$   | $$| $$      | $$$$| $$   | $$  | $$  \\ $$| $$$$| $$  | $$  | $$  \\__/| $$  \\ $$
   | $$$$$   |  $$ / $$/| $$$$$   | $$ $$ $$   | $$  | $$  | $$| $$ $$ $$  | $$  | $$      | $$$$$$$$
   | $$__/    \\  $$ $$/ | $$__/   | $$  $$$$   | $$  | $$  | $$| $$  $$$$  | $$  | $$      | $$__  $$
   | $$        \\  $$$/  | $$      | $$\\  $$$   | $$  | $$  | $$| $$\\  $$$  | $$  | $$    $$| $$  | $$
   | $$$$$$$$   \\  $/   | $$$$$$$$| $$ \\  $$   | $$  |  $$$$$$/| $$ \\  $$ /$$$$$$|  $$$$$$/| $$  | $$
   |________/    \\_/    |________/|__/  \\__/   |__/   \\______/ |__/  \\__/|______/ \\______/ |__/  |__/                                                                                                     
   `);

    console.log("connected as Administrator");

    app.startQuestion(() => { connection.end() });
  })
}

// *Uncomment below line once you have mySQL setup

pgConnect();