const helpers = require('./server/db.js');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const millionCheck = require('./server/checkMillionDollarIdea.js');

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
//TODO: Missing validation for cases like 'notanId'
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

apiRouter.put('/minions/:minionId', (req, res, next) => {
  console.log(`>>>>>>>> request.body is: ${pp(req.body)}`);
  const id = req.params.minionId;
  const newMinion = req.body;
  const updated = helpers.updateInstanceInDatabase('minions', newMinion);
  if (updated !== null) {
    res.status(200).send(updated);
  }
  else {
    res.status(404).send();
  }
});

apiRouter.delete('/minions/:minionId', (req, res, next) => {
  console.log(`>>>>>>>> request.body is: ${pp(req.body)}`);
  const id = req.params.minionId;
  const deleted = helpers.deleteFromDatabasebyId('minions', id);
  if (deleted) {
    res.status(204).send(deleted);
  }
  else {
    res.status(404).send();
  }
});

//START API/IDEAS ROUTERS
apiRouter.get('/ideas', (req, res, next) => {
  const ideas = helpers.getAllFromDatabase('ideas');
  res.send(ideas);
});

apiRouter.post('/ideas', millionCheck, (req, res, next) => {
  const body = req.body;
  const name = body && body.name;
  const description = body && body.description;
  const weeks = body && body.numWeeks;
  const revenue = body && body.weeklyRevenue;
  const newIdea = helpers.addToDatabase('ideas', {name: name, description: description, numWeeks: weeks, weeklyRevenue: revenue});
  res.status(201).send(newIdea);
});
//TODO: Missing validation for cases like 'notanId'
apiRouter.get('/ideas/:ideaId', (req, res, next) => {
  console.log(`>>>>>>>> request.body is: ${pp(req.body)}`);
  const id = req.params.ideaId;
  const idea = helpers.getFromDatabaseById('ideas', id);
  if (idea !== -1) {
    res.status(200).send(idea);
  }
  else {
    res.status(404).send();
  }
});

apiRouter.put('/ideas/:ideaId', (req, res, next) => {
  console.log(`>>>>>>>> request.body is: ${pp(req.body)}`);
  const id = req.params.ideaId;
  const newIdea = req.body && req.body;
  const updated = helpers.updateInstanceInDatabase('ideas', newIdea);
  if (updated !== null) {
    res.status(200).send(updated);
  }
  else {
    res.status(404).send();
  }
});

apiRouter.delete('/ideas/:ideaId', (req, res, next) => {
  console.log(`>>>>>>>> request.body is: ${pp(req.body)}`);
  const id = req.params.ideaId;
  const deleted = helpers.deleteFromDatabasebyId('ideas', id);
  if (deleted) {
    res.status(204).send(deleted);
  }
  else {
    res.status(404).send();
  }
});

//START API/MEETINGS ROUTERS
apiRouter.get('/meetings', (req, res, next) => {
  const meetings = helpers.getAllFromDatabase('meetings');
  res.send(meetings);
});

apiRouter.post('/meetings', (req, res, next) => {
  console.log(`>>>>>>>> request.body is: ${pp(req.body)}`);
  const body = req.body;
  const time = body && body.time;
  const date = body && body.date;
  const day = body && body.day;
  const note = body && body.note;
  const newMeeting = helpers.addToDatabase('meetings', {time: time, date: date, day: day, note: note});
  res.status(201).send(newMeeting);
});

apiRouter.delete('/meetings', (req, res, next) => {
  console.log(`>>>>>>>> request.body is: ${pp(req.body)}`);
  const deleted = helpers.deleteAllFromDatabase('meetings');
  res.status(204).send(deleted);
})