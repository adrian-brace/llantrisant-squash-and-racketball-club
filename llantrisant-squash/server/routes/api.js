const express = require('express');
var fs = require('fs');
const router = express.Router();

// declare axios for making http requests
const axios = require('axios');

//const API = 'https://jsonplaceholder.typicode.com';
const API = 'data_generated/fixtures/Llantrisant/fixtures.json';

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

// Get all fixtures
router.get('/fixtures', (req, res) => {
  // Get fixtures from the mock api
  // This should ideally be replaced with a service that connects to MongoDB
  fs.readFile(API, 'utf8', function read(err, data) {

    if (err){ 
      res.status(500).send(err)
    }

    res.status(200).json(JSON.parse(data));
  });

  //res.status(200).json(JSON.parse(fs.readFileSync(API, 'utf8')));
/*
  axios.get(`${API}/posts`)
  .then(posts => {
    res.status(200).json(posts.data);
  })
  .catch(error => {
    res.status(500).send(error)
  });*/
});

module.exports = router;