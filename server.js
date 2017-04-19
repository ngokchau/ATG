/**
 * Import the packages we need.
 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');

/**
 * Register all the models in the server models directory.
 *
 * @type {*|exports|module.exports}
 */
var Vote = require('./server/models/vote');

/**
 * Configure app to use bodyParser() that lets the API accepts data from a
 * POST request.
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * Connect to local MongoDB server. Should be decoupled to another machine
 * to facilitate redundancy, SoC, scaling up, etc...
 */
mongoose.connect('mongodb://localhost:27017/mean-dev');

/**
 * Set port number to the PORT environment variable. If PORT is null, then
 * default to 8000.
 *
 * @type {*|number}
 */
var port = process.env.PORT || 8000;

/**
 * Get an instance of Express Router to be used for the API.
 */
var router = express.Router();

/**
 * Middleware that outputs all API requests to the console.
 */
router.use(function(req, res, next) {
	console.log(req.method + ' ' + req.url);
	next();
});

/**
 * Sets the API prefix to starts with /api.
 */
app.use('/api', router);

/**
 * The base route to verify API is working correctly.
 */
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });
});

/**
 * Register all the routes in the server routes directory.
 */
require('./server/routes/vote')(router);

/**
 * Define the directory for client side assets.
 */
app.use(express.static('./public'));

/**
 * All paths that are not defined will be served with resource not found.
 */
app.get('*', function(req, res) {
	res.send('What?!', 404);
});

/**
 * Starting up the server
 */
app.listen(port);
console.log('Magic happens on port ' + port);
