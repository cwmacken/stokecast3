// Run from root dir with: node ./helpers/pushover.js

var push = require('../lib/pushover');

// Check if Pushover is set up
push.checkKeysFile(function(response) {

  if (response) {

    console.log("pushover tokens exist and loaded")

  } else {

    console.log("pushover tokens don't exist-> no alerts for you")

  }

})
