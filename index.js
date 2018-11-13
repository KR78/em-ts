'use strict'

/**
 * Dependencies
 */

const http = require('http'),
	  path = require('path'),
      express = require('express'),
      app = module.exports.app = express(),
	  server = http.createServer(app),
      io = require('socket.io')(server); //pass a http.Server instance

const socket = require('socket.io-client')('http://localhost:3000');

var code = '';

server.listen(process.env.PORT || 3000);

//Modules
const db = require('./modules/database');
const ct = require('./modules/controller');


// Allow Get Requests For The APP's Assets
app.use('/public/socket.io', express.static(path.join(__dirname, 'public/socket.io')));

// Return The Home Page
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

// Return The Profile Page
app.get('/profile', function(req, res) {
	code = req.query.code;
	console.log(req.query.code);
  res.sendFile(__dirname + '/public/index.html');
});

// Return The Home Page
app.get('/callback/', function(req, res) {
	console.log(req.params);
		res.redirect('/profile?code=' + req.query.code);
});