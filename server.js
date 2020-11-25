const App = require('./src');

// Waiting for database to be initialized, TODO: status check for DB. 
sleep(5000);

App.dbcheck();
App.createdbModels();
App.initExpress();

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
