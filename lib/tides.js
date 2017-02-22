var momentTimezone = require('moment-timezone'),
    moment = require('moment'),
    fs = require('fs'),
    request = require('request'),
    cheerio = require('cheerio');

var exports = module.exports = {

  getTideLa: function(cb){
    console.log("starting get tide LA method")
    var mtime = moment.utc();
    var year = mtime.tz('America/Los_Angeles').format('YYYY');
    var month = mtime.tz('America/Los_Angeles').format('MM');
    var day = mtime.tz('America/Los_Angeles').format('DD');
    var url = "http://tbone.biol.sc.edu/tide/tideshow.cgi?tplotdir=horiz;type=graph;gx=480;gy=240;caltype=ndp;interval=00%3A01;glen=1;fontsize=%2B0;units=feet;comment=1;year="+year+";month="+month+";day="+day+";hour=00;min=01;tzone=local;d_year=;d_month=01;d_day=01;d_hour=00;d_min=00;ampm24=24;nodlines=1;nofill=1;colortext=black;colordatum=black;colormsl=black;colortics=red;colorday=white;colornight=skyblue;colorebb=deep-%3Cbr%20%2F%3Eskyblue;colorflood=deep-%3Cbr%20%2F%3Eskyblue;site=El%20Segundo%2C%20Santa%20Monica%20Bay%2C%20California"
    request(url, function(err, res, body) {

      if (err){
        cb(err)
        return false
      }

      var $ = cheerio.load(body);

      if($('img').attr('src') === undefined ){
        cb("img is undefined")
        return false
      }

      var imgUrl = 'http://tbone.biol.sc.edu/tide/'+ $('img').attr('src')
      request(imgUrl).pipe(fs.createWriteStream( __dirname +'/../tidedata/sm_tide.png').on('close', function(){
          cb(err)
      }));

    });

  }
};
