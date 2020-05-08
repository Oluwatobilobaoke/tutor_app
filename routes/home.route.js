const express = require('express');
const home = require('../controllers/home.controller');

const index = express.Router();

index.get('/', home);

module.exports = index;
