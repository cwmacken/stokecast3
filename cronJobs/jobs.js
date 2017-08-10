var CronJob = require('cron').CronJob;
var tides = require('../lib/tides');
var conditions = require('../lib/conditions');

var exports = module.exports = {

  setTideCronJobs: function(cb) {
    new CronJob('0 0 1 * * *', function() {
      console.log('You will see this message at 1 am LA time - starting Tide Job');
      tides.getTideLa(function(response) {
        if (response === null) {
          console.log("LA tide graph fetch successful")
        } else {
          console.log("ERROR: LA tide graph fetch error", response)
        }
      });
    }, null, true, 'America/Los_Angeles');
    cb();
  },

  setSwellCronJobs: function(cb) {
    new CronJob('0 0 1 * * *', function() {
      console.log('You will see this message at 1 am LA time - starting Swell Job');
      conditions.getSwellData(function(response) {
        if (response === null) {
          console.log("LA Swell fetch successful")

        } else {
          console.log("ERROR: LA Swell fetch error", response)
        }
      });
    }, null, true, 'America/Los_Angeles');
    cb();
  },

  setWindCronJobs: function(cb) {
    new CronJob('0 0 1 * * *', function() {
      console.log('You will see this message at 1 am LA time - starting Wind Job');
      conditions.getWindData(function(response) {
        if (response === null) {
          console.log("LA Wind fetch successful")

        } else {
          console.log("ERROR: LA Swell fetch error", response)
        }
      });
    }, null, true, 'America/Los_Angeles');
    cb();
  }

}
