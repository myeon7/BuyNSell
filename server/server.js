// ExpressJS Setup
const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const bsdbRouter = require('./routes/bsdb');


// Access to Frontend 
app.use(express.static(path.resolve('client')));

// Access to Database
app.use('/bsdb', bsdbRouter);

// Error Handler (local)
app.use((req, res) => res.status(404).send('This is not the page you are looking for...'));
// Error Handler (global)
app.use((err, req, res, next) => {
  console.log('GLOBAL ERROR!!!')
  res.status(err.status).send(err.message);
});

app.listen(PORT, () => {`Listening on port: {PORT}`});

module.exports = app;