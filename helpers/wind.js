// Run from root dir with: node ./helpers/wind.js

var wind = require('../lib/conditions');

wind.getWindData(function(response) {

  if (response === null) {
    console.log("LA wind data fetch successful")
  } else {
    console.log("ERROR: LA swell data fetch ", response)
  }

})
