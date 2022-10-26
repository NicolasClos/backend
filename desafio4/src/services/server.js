const express = require('express');
const route = require('../routes/index')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));


app.use(express.static('public'))
app.use('/api/productos', route);

module.exports = app;