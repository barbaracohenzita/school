const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to the Student Organization Study App');
});

module.exports = app;
