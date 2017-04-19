// server.js

// BASE SETUP
// =============================================================================

// import the packages we need
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');

var Vote = require('./server/models/vote');

// configure app to use bodyParser()
// this will elt us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mean-dev');

var port = process.env.PORT || 8000;

// ROUTER FOR OUR API
// =============================================================================
var router = express.Router();

// middleware to use for all requrests
router.use(function(req, res, next) {
	console.log(req.method + ' ' + req.url);
	next();
});

// test route to make sure everything is working
// GET http://localhost:8000/api
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for API to be added here
require('./server/routes/vote')(router);

// REGISTER ROUTES
// all routes will be prefixed with /api
app.use('/api', router);

// STATIC FILES
app.use(express.static('./public'));

// CLIENT RENDER
app.get('/', function(req, res) {
	res.sendfile('./public/index.html');
});

app.get('*', function(req, res) {
	res.send('What?!', 404);
});

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
