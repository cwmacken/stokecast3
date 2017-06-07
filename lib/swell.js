var request = require('request');
var jsonfile = require('jsonfile');
var axios = require('axios')

var exports = module.exports = {

	getSwellData: function(cb) {

		console.log("starting get swell LA method")

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
