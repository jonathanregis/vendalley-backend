const express = require('express');
const config = require('./config.json');
const app = express();
const port = 5500;
const {getUser, createUser} = require('./handlers/Users');

if (config.cors.enabled) {
  app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', config.cors.allowedOrigins);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
}

app.use(express.json());

app.get('/', (req, res) => {
  res.send('ExpressJS server!');
});

app.get('/users', getUser);
app.get('/users/:email', getUser);
app.post('/users', createUser);

app.listen(port, async () => {
  console.log(`Server listening at http://localhost:${port}`);
});
