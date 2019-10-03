const express = require('express');
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);
app.locals.title = 'skiResortStates';
app.use(express.json());

app.get('/', (request, response) => {
  response.send('Find the Ski Resorts for each state!');
});

app.get('/api/v1/states', (request, response) => {
  database('states').select()
    .then((states) => {
      response.status(200).json(states);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/mountains', (request, response) => {
  database('mountains').select()
    .then((mountains) => {
      response.status(200).json(mountains);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on PORT ${app.get('port')}`)
});

