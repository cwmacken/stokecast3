// Run from root dir with: node ./helpers/swell.js

var swell = require('../lib/conditions');

swell.getSwellData(function(response) {

  if (response === null) {
    console.log("LA swell data fetch successful")
  } else {
    console.log("ERROR: LA swell data fetch ", response)
  }

})
