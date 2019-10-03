const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);
app.locals.title = 'skiResortStates';
app.use(express.json());

app.get('/', (request, response) => {
  return response.send('Test starting the server');
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on PORT ${app.get('port')}`)
});

