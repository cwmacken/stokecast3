var currentEnv = process.env.NODE_ENV || 'local';

var config = {};

// ENV set up

config.env = {
  production: false,
  local: false
};

config.env[currentEnv] = true;

// TODO: move this to keys
config.firebase = {
  apiKey: "AIzaSyBDugxOr0kCfZ6Vxn4JQomt4uB-0W1SE88",
  authDomain: "carneasada-f0617.firebaseapp.com"
}

config.testTide = false;

// Set Values
if (currentEnv === 'production') {

}

if (currentEnv === 'local') {

}

module.exports = config;
