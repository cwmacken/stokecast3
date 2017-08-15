var express = require('express');
var router = express.Router();
var app = express();
var https = require('https');
var http = require('http');
var firebase = require("firebase");
var request = require('request');
var tides = require('../lib/tides');
var swell = require('../cacheddata/swelldata/swelldata.json')
var wind = require('../cacheddata/winddata/winddata.json')

// GET /server/data
router.get('/data', function(req, res) {
  res.json({
    text: "get request is good!"
  })
});

// POST /server/postData
router.post('/postData', function(req, res) {

  if (req.body.on === true) {
    res.json({
      text: "its working, test: 1"
    })
  } else {
    res.json({
      text: "its working, test: 2"
    })
  }
});

// NOT CURRENTLY USED, WILL BE USED WHEN DB IS CREATED
router.post('/swellData', function(req, res) {
  //  QUESTION: maybe i can add the module here
  res.json(swell)
});

// NOT CURRENTLY USED, WILL BE USED WHEN DB IS CREATED
router.post('/windData', function(req, res) {
  res.json(wind)
});

module.exports = router;
