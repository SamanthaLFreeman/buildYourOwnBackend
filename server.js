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

app.get('/api/v1/states/:id', (request, response) => {
  database('states').where('id', request.params.id).select()
    .then(state => {
      if (state.length) {
        response.status(200).json(state);
      } else {
        response.status(404).json({error: `Couldn't find a state with id ${request.params.id}`});
      }
    })
    .catch(error => {
      response.status(500).json({error});
    });
});

app.get('/api/v1/mountains/:id', (request, response) => {
  database('mountains').where('id', request.params.id).select()
    .then(mountain => {
      if (mountain.length) {
        response.status(200).json(mountain);
      } else {
        response.status(404).json({ error: `Couldn't find a mountain with id ${request.params.id}` });
      }
    })
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
      response.status(201).json({ id: mountainId[0] });
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
  console.log(`${app.locals.title} is running on PORT ${app.get('port')}`);
});

