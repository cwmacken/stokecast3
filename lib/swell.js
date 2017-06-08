var request = require('request');
var jsonfile = require('jsonfile');
var axios = require('axios');
var fs = require('fs');

var exports = module.exports = {

	getSwellData: function(cb) {

		console.log("starting get swell LA method")

		fs.stat(__dirname + '/../cacheddata/swelldata/swelldata.json', function(err, stat) {
		    if(err === null) {
		        console.log('File exists');
		    } else if(err.code === 'ENOENT') {
		        // file does not exist
						console.log("file doesn't exist")
		        fs.writeFile(__dirname + '/../cacheddata/swelldata/swelldata.json');
		    } else {
		        console.log('Some other error: ', err.code);
						return false
		    }
		});



		axios.get("http://api.spitcast.com/api/county/swell/los-angeles/?dcat=week").then(function(response){

				if(response.status !== 200){
					cb("get LA swell data failed")
					return false
				}

				jsonfile.writeFile(__dirname + '/../cacheddata/swelldata/swelldata.json', response.data, function (err) {
					cb(err)
				})

		})

	}


}
