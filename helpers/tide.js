// Run from root dir with: node ./helpers/tide.js 

var momentTimezone = require('moment-timezone'),
		moment = require('moment'),
		fs = require('fs'),
		request = require('request'),
		cheerio = require('cheerio');

var tides = require('../lib/tides');

console.log("run tide.js");

tides.getTideLa(function(response){
	if(response === null){
		console.log("LA tide graph fetch successful")
	}else{
		console.log("ERROR: LA tide graph fetch error", response)
	}
});
