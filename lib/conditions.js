var request = require('request');
var jsonfile = require('jsonfile');
var axios = require('axios');
var fs = require('fs');
var push = require("./pushover")

var exports = module.exports = {

  // method to get wind data for LA
  getWindData: function(cb) {

    var self = this;

    // axios get request for raw data
    function windDataCall() {

      axios.get("http://api.spitcast.com/api/county/wind/los-angeles/?dcat=week").then(function(response) {

        if (response.status !== 200) {
          cb("get LA wind data failed")
          push.send("Stokecast", "Get LA wind failed");
          return false
        }

        self.sortWindData(response.data, function(res) {

          jsonfile.writeFile(__dirname + '/../cacheddata/winddata/winddata.json', res, function(err) {
            push.send("Stokecast", "Got LA wind data");
            cb(err)
          })

        })

      })

    }

    // check if file exists, if file exists get data if it does not create file then get data
    fs.stat(__dirname + '/../cacheddata/winddata/winddata.json', function(err, stat) {
      if (err === null) {
        console.log('File exists');
        windDataCall()
      } else if (err.code === 'ENOENT') {
        // file does not exist
        console.log("file doesn't exist")
        fs.writeFile(__dirname + '/../cacheddata/winddata/winddata.json');
        windDataCall()
      } else {
        console.log('Some other error: ', err.code);
        return false
      }
    });

  },

  // Method to clean bad wind data and it back to be written
  sortWindData: function(data, cb) {

    rawWindData = []

    dayCheck = null;

    var dataSort = function(data) {

      var newObject = {}

      newObject.day = data.day

      newObject.hour = data.hour

      newObject.speed = data.speed_mph

      newObject.dir = data.direction_degrees

      rawWindData.push(newObject)

    }

    // loop through all data
    for (var dataIndex = 0; dataIndex < data.length; dataIndex++) {

      if (dayCheck === null) {

        // loop starts
        dayCheck = data[dataIndex].day

        dataSort(data[dataIndex])

        dataIndex = dataIndex++

      } else if (data[dataIndex].day !== dayCheck) {

        // new day
        dayCheck = data[dataIndex].day

        if (data[dataIndex].day === "NA") {

          // dont record this data

        } else {

          dataSort(data[dataIndex])

        }



      } else {

        // day is the same
        if (data[dataIndex].day === "NA") {

          // skip recording this data due to bad day

        } else {

          dataSort(data[dataIndex])

        }

      }

    }

    // raw wind data to be sent back and saved
    cb(rawWindData)

  },

  getSwellData: function(cb) {

    function swellDataCall() {

      axios.get("http://api.spitcast.com/api/county/swell/los-angeles/?dcat=week").then(function(response) {

        if (response.status !== 200) {
          push.send("Stokecast", "Get LA swell data failed");
          cb("get LA swell data failed")
          return false
        }

        jsonfile.writeFile(__dirname + '/../cacheddata/swelldata/swelldata.json', response.data, function(err) {
          push.send("Stokecast", "Got LA swell data");
          cb(err)
        })

      })

    }
    // if file exsits save data, if not create file then save data
    fs.stat(__dirname + '/../cacheddata/swelldata/swelldata.json', function(err, stat) {
      if (err === null) {

        swellDataCall()

      } else if (err.code === 'ENOENT') {
        // file does not exist
        fs.writeFile(__dirname + '/../cacheddata/swelldata/swelldata.json');
        swellDataCall()
      } else {
        console.log('Some other error: ', err.code);
        return false
      }
    });





  }


}
