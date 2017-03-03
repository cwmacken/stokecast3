var express = require('express');
var router = express.Router();
var app = express();
var https = require('https');
var http = require('http');
var firebase = require("firebase");
var request = require('request');
var tides = require('../lib/tides');
var swell = require('../cacheddata/swelldata/swelldata.json')

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


router.post('/swellData', function(req, res) {
    res.json(swell)
});

module.exports = router;
