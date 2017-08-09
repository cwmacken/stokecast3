// this is where all the pushover calls will live
var fs = require('fs');
var Pushover = require('node-pushover');
var push = null

var exports = module.exports = {

  // Wrapper for all pushover calls
  send: function(title, msg) {

    if (push !== null) {

      push.send(title, msg);

    } else {
      console.log("pushover not set up")
    }



  },


  // Checks if keys file exists and if it does loads up token and user
  checkKeysFile: function(cb) {

    console.log("inside check keys file")

    var keysExists = false

    fs.stat(__dirname + '/../keys.js', function(err, stat) {
      if (err == null) {
        console.log('Keys.js File exists');

        var keys = require('./../keys')

        console.log(keys)

        push = new Pushover({
          token: keys.pushover.token,
          user: keys.pushover.user
        });

        keysExists = true;

        cb(keysExists)
      } else if (err.code == 'ENOENT') {
        console.log("fiel does not exist")
        // file does not exist
        cb(keysExists)
      } else {
        console.log('Some other error: ', err.code);
        cb(keysExists)
      }
    });
  },

}
