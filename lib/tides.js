var fs = require('fs'),
    request = require('request');
var cheerio = require('cheerio');

var exports = module.exports = {

	tidecheck: function(cb){

		console.log("tidecheck two");

		var text = "naw";

		var url = 'http://tbone.biol.sc.edu/tide/tideshow.cgi?tplotdir=horiz;type=graph;gx=480;gy=240;caltype=ndp;interval=00%3A01;glen=1;fontsize=%2B0;units=feet;min=01;tzone=local;d_year=;d_month=01;d_day=01;d_hour=00;d_min=00;ampm24=24;weekday=1;nodlines=1;notimes=1;nofill=1;colortext=black;colordatum=black;colormsl=black;colortics=red;colorday=white;colornight=skyblue;colorebb=deep-%3Cbr%20%2F%3Eskyblue;colorflood=deep-%3Cbr%20%2F%3Eskyblue;site=El%20Segundo%2C%20Santa%20Monica%20Bay%2C%20California'

		request(url, function(err, res, body) {
			
			console.log("error", err)
		  if (err)
		    throw err;
		  var $ = cheerio.load(body);

			console.log($('img').attr('src'))
			console.log('http://tbone.biol.sc.edu/tide/'+ $('img').attr('src'))

			var imgUrl = 'http://tbone.biol.sc.edu/tide/'+ $('img').attr('src')

			request(imgUrl).pipe(fs.createWriteStream('tide.png'))

		});

		cb(text);

	}

};
