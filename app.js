var express = require('express'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    consolidate = require('consolidate'),
    routes = require('./routes/index'),
    config = require('./config'),
    tides = require('./lib/tides'),
	swell = require('./lib/swell'),
    jobs = require('./cronJobs/jobs');

const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const wpConfig = require('./webpack.config.js');
const webpackHotMiddleware = require('webpack-hot-middleware');

var app = express();

app.engine('dust', consolidate.dust);
app.set('view engine', 'dust');
app.set('views', './src');

app.use(bodyParser.json());

app.use('/server', routes);

app.use('/cacheddata', express.static(__dirname + '/cacheddata'));

app.set('port', process.env.PORT || 9090);

const isDeveloping = process.env.NODE_ENV !== 'production';

console.log("in prod mode", !isDeveloping)

const port = isDeveloping ? 9090 : process.env.PORT;

if (isDeveloping) {
    const compiler = webpack(wpConfig);
    const middleware = webpackMiddleware(compiler, {
        publicPath: wpConfig.output.publicPath,
        contentBase: 'src',
        stats: {
            colors: true,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false,
            modules: false
        }
    });

    app.use(middleware);
    app.use(webpackHotMiddleware(compiler));
    app.get('*', function response(req, res) {
        res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
        res.end();
    });

    if (config.testTide) {
        // fetch LA tide and swell when app starts
        console.log("config.testTide set to True")
        tides.getTideLa(function(response) {
            if (response === null) {
                console.log("LA tide graph fetch successful")
            } else {
                console.log("ERROR: LA tide graph fetch error", response)
            }
        });

        swell.getSwellData(function(response){

        	if (response === null) {
        			console.log("LA swell data fetch successful")
        	} else {
        			console.log("ERROR: LA swell data fetch ", response)
        	}

        })

    } else {
        console.log("config.testTide set to False")
    }
} else {

    // fetch LA tide when app starts
    tides.getTideLa(function(response) {
        if (response === null) {
            console.log("LA tide graph fetch successful")
        } else {
            console.log("ERROR: LA tide graph fetch error", response)
        }
    });

    // Fetch LA Swell when app starts
    swell.getSwellData(function(response){

    	if (response === null) {
    			console.log("LA swell data fetch successful")
    	} else {
    			console.log("ERROR: LA swell data fetch ", response)
    	}

    })

    jobs.setTideCronJobs(function() {
        console.log("Tide Cron Job Set")
    })

    jobs.setSwellCronJobs(function() {
        console.log("Swell Cron Job Set")
    })

    app.use(express.static(__dirname + '/dist'));
    app.get('*', function response(req, res) {
        res.sendFile(path.join(__dirname, 'dist/index.html'));
    });
}

var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
});

module.exports = app;
