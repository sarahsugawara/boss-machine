const helpers = require('./server/db.js');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

//Console helper function
const pp = x => JSON.stringify(x, null, 2);

module.exports = app;

/* Do not change the following line! It is required for testing and allowing
*  the frontend application to interact as planned with the api server
*/
const PORT = process.env.PORT || 4001;

// Add middleware for handling CORS requests from index.html
app.use(cors());

// Add middware for parsing request bodies here:
app.use(bodyParser.json());

// Mount your existing apiRouter below at the '/api' path.
const apiRouter = require('./server/api');
app.use('/api', apiRouter);

// This conditional is here for testing purposes:
if (!module.parent) { 
  // Add your code to start the server listening at PORT below:
  app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
  });
}


apiRouter.get('/minions', (req, res, next) => {
  const minions = helpers.getAllFromDatabase('minions');
  res.send(minions);
});

apiRouter.post('/minions', (req, res, next) => {
  const body = req.body;
  const minion = body && body.name;
  const title = body && body.title;
  const salary = body && body.salary;
  const weakness = body && body.weakness;
  const newMinion = helpers.addToDatabase('minions', {name: minion, title: title, salary: salary, weaknesses: weakness});
  res.status(201).send(newMinion);
});

apiRouter.get('/minions/:minionId', (req, res, next) => {
  console.log(`>>>>>>>> request.body is: ${pp(req.params)}`);
  const id = req.params.minionId;
  const minion = helpers.getFromDatabaseById('minions', id);
  if (minion !== -1) {
    res.status(200).send(minion);
  }
  else {
    res.status(404).send();
  }
});