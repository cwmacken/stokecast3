var CronJob = require('cron').CronJob;
var tides = require('../lib/tides');

var exports = module.exports = {
	setTideCronJobs: function(cb){
		new CronJob('0 0 0 * * *', function() {
			console.log('You will see this message at 12 am LA time');
			tides.getTideLa(function(response){
				if(response === null){
					console.log("LA tide graph fetch successful")
				}else{
					console.log("ERROR: LA tide graph fetch error", response)
				}
			});
		}, null, true, 'America/Los_Angeles');
		cb();
	}
}
