const express = require('express');
const bitecasts = require('./bitecasts');

const apiRouter = express.Router()

apiRouter.use('/bitecasts', bitecasts);

module.exports = apiRouter;