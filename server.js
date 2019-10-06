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

//sets up the '/mountains/:id' GET endpoint for finding a specific mountain
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

//sets up the '/states/' POST endpoint for adding a state to the array of states
app.post('/api/v1/states', (request, response) => {
//assigns the request body to state
  const state = request.body;

//set up required parameters for the request body listing all names in an array
  for (let requiredParameter of ['name', 'avgSnow']) {
//if the passed through state doesn't have the notated required parameters
    if (!state[requiredParameter]) {
//then it returns a 422 status code with a message of what is missing from the request body
      return response
        .status(422)
        .send({ error: `Expected format: { name: <String>, avgSnow: <String> }. You're missing a "${requiredParameter}" property.` });
    }
  }

//if nothing is missing from the request body, then searches in the database for the 'states' table
//insert method can define what data is being added with what is returning as a response
  database('states').insert(state, 'id')
    .then(stateId => {
//if there is a state id then it returns a status code of 201
//along with an array, so you have to grab the first index to get the id we requested returned in the previous line
      response.status(201).json({ id: stateId[0] })
    })
//if there is an server error, then it returns the status code 500 with a message
    .catch(error => {
      response.status(500).json({ error });
    });
});

//sets up the '/mountains/' POST endpoint for adding a mountain to the array of mountains
app.post('/api/v1/mountains', (request, response) => {
//assigns the request body to mountain
  const mountain = request.body;

//set up required parameters for the request body listing all names in an array
  for (let requiredParameter of ['name', 'mountainHeight', 'size', 'skiLifts', 'states_id']) {
//if the passed through state doesn't have the notated required parameters
    if (!mountain[requiredParameter]) {
//then it returns a 422 status code with a message of what is missing from the request body
      return response
        .status(422)
        .send({ error: `Expected format: { name: <String>, mountainHeight: <String>, size: <String>, skiLifts: <Number>, states_id: <Number> }. You're missing a "${requiredParameter}" property.` });
    }
  }

//if nothing is missing from the request body, then searches in the database for the 'mountains' table
//insert method can define what data is being added with what is returning as a response
  database('mountains').insert(mountain, 'id')
    .then(mountainId => {
//if there is a mountain id then it returns a status code of 201
//along with an array, so you have to grab the first index to get the id we requested returned in the previous line
      response.status(201).json({ id: mountainId[0] })
    })
//if there is an server error, then it returns the status code 500 with a message
    .catch(error => {
      response.status(500).json({ error });
    });
});

//sets up the '/mountains/:id' DELETE endpoint for removing a specific mountain
app.delete('/api/v1/mountains/:id', (request, response) => {
//assign the id from the path to mountainId
  const mountainId = request.params.id;

//Looks in the database for the 'mountains' table.
//Where method then searches for the row with the 'id' column with the same integer value as mountainId
  database('mountains').where('id', mountainId)
    .then(mountain => {
//if the mountain found has length (truthy), then find the mountain in the table so it can be removed
//with the del method
//then returns a response of 201 with a message that it was succesfully removed
      if (mountain.length) {
        database('mountains').where('id', mountainId).del()
        .then(() => response.status(201).json("Mountain has been removed."));
      } else {
//else a 404 status code is returned with a error message that the id cannot be found
        response.status(404).json({ error: `Couldn't find a mountain with id ${request.params.id}` });
      }
    })
//if there is an server error, then it returns the status code 500 with a message
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on PORT ${app.get('port')}`)
});

