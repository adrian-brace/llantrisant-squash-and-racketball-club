const express = require('express');
var fs = require('fs');
const router = express.Router();

// declare axios for making http requests
const axios = require('axios');
const API = 'data_generated/fixtures/Llantrisant/fixtures.json';

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

// Get all fixtures
router.get('/fixtures', (req, res) => {
  // Get fixtures from the mock api
  // This should ideally be replaced with a service that connects to MongoDB
  res.status(200).json(JSON.parse(fs.readFileSync(API, 'utf8')));
});

module.exports = router;