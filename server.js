//Make express framework available in the server file (makes node.js easier to use)
const express = require('express');
//Create basic app server
const app = express();
//assign the environment based on the process variables, which can vary depending on where the application is running
const environment = process.env.NODE_ENV || 'development';
//assigns configuration to work with the knex database
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

//set up the 'port' if there is none specified, then it will run on 3000
app.set('port', process.env.PORT || 3000);
//assign a title for the backend application
app.locals.title = 'skiResortStates';
//parses incoming requests with JSON payloads
app.use(express.json());

//set up initial endpoint, for the home path
app.get('/', (request, response) => {
//the endpoint handler prints a message on the DOM
  response.send('Find the Ski Resorts for each state!');
});

//sets up the '/states' GET endpoint
app.get('/api/v1/states', (request, response) => {
//Looks in the database for the 'states' table, select 
//returns an array of objects in the database
  database('states').select()
//if an array returns then it returns a status code of 200 with the whole array
    .then((states) => {
      response.status(200).json(states);
    })
//else if an error returns, then it returns a 500 status code (something wrong with server)
//along with the error message
    .catch((error) => {
      response.status(500).json({ error });
    });
});

//sets up the '/mountains' GET endpoint
app.get('/api/v1/mountains', (request, response) => {
//Looks in the database for the 'mountains' table, select 
//returns an array of objects in the database
  database('mountains').select()
//if an array returns then it returns a status code of 200 with the whole array
    .then((mountains) => {
      response.status(200).json(mountains);
    })
//else if an error returns, then it returns a 500 status code (something wrong with server)
//along with the error message
    .catch((error) => {
      response.status(500).json({ error });
    });
});

//sets up the '/states/:id' GET endpoint for finding a specific state
app.get('/api/v1/states/:id', (request, response) => {
//Looks in the database for the 'states' table.
//Where method then searches for the row with the 'id' column with the same integer value passed through the path
//Then select returns the object found
  database('states').where('id', request.params.id).select()
    .then(state => {
//if the object has length (truthy), then 200 status code is returned with the found state
      if (state.length) {
        response.status(200).json(state);
//else the 404 status code is returned with an error message that the specific id wasn't available
      } else {
        response.status(404).json({error: `Couldn't find a state with id ${request.params.id}`});
      }
    })
//if there was a server error, then an error returns a 500 status code
    .catch(error => {
      response.status(500).json({error});
    });
});

//sets up the '/mountains/:id' GET endpoint for finding a specific state
app.get('/api/v1/mountains/:id', (request, response) => {
//Looks in the database for the 'mountains' table.
//Where method then searches for the row with the 'id' column with the same integer value passed through the path
//Then select returns the object found
  database('mountains').where('id', request.params.id).select()
    .then(mountain => {
//if the object has length (truthy), then 200 status code is returned with the found state
      if (mountain.length) {
        response.status(200).json(mountain);
//else the 404 status code is returned with an error message that the specific id wasn't available
      } else {
        response.status(404).json({ error: `Couldn't find a mountain with id ${request.params.id}` });
      }
    })
//if there was a server error, then an error returns a 500 status code
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.post('/api/v1/states', (request, response) => {
  const state = request.body;

  for (let requiredParameter of ['name', 'avgSnow']) {
    if (!state[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { name: <String>, avgSnow: <String> }. You're missing a "${requiredParameter}" property.` });
    }
  }

  database('states').insert(state, 'id')
    .then(stateId => {
      response.status(201).json({ id: stateId[0] })
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.post('/api/v1/mountains', (request, response) => {
  const mountain = request.body;
  for (let requiredParameter of ['name', 'mountainHeight', 'size', 'skiLifts', 'states_id']) {
    if (!mountain[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { name: <String>, mountainHeight: <String>, size: <String>, skiLifts: <Number>, states_id: <Number> }. You're missing a "${requiredParameter}" property.` });
    }
  }

  database('mountains').insert(mountain, 'id')
    .then(mountainId => {
      response.status(201).json({ id: mountainId[0] })
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.delete('/api/v1/mountains/:id', (request, response) => {
  const mountainId = request.params.id;
  database('mountains').where('id', mountainId)
    .then(mountain => {
      if (mountain.length) {
        database('mountains').where('id', mountainId).del()
        .then(() => response.status(201).json("Mountain has been removed."));
      } else {
        response.status(404).json({ error: `Couldn't find a mountain with id ${request.params.id}` });
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on PORT ${app.get('port')}`)
});

