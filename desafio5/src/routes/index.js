const { Router } = require('express');
const rutaPrincipal = Router();
const prodRoute = require('./productos')

rutaPrincipal.use('/productos', prodRoute)

module.exports = rutaPrincipal;