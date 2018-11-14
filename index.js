'use strict'

/**
 * Dependencies
 */

const http = require('http'),
	  path = require('path'),
	  config = require('config'),
      express = require('express'),
      app = module.exports.app = express(),
      axios = require('axios'),
	  server = http.createServer(app),
	  localStorage = require('localStorage'),
      io = require('socket.io')(server); //pass a http.Server instance

const socket = require('socket.io-client')('http://localhost:3000');

var AUTH_TOKEN = '';

var true_layer_api = axios.create({
  baseURL: 'https://api.truelayer.com/data/v1/',
  headers: {
    Authorization: {
      toString () {
        return `Bearer ${localStorage.getItem('auth_token')}`
      }
    }
  }
});

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
	localStorage.setItem('auth_token', req.query.code); // store token in localstorage
	io.emit('auth_token', req.query.code); // emit token to client using socket.io
	console.log(req.query.code);
	axios.get('https://auth.truelayer.com/connect/token', { headers: { "client_id": "emmatest-qv1r", "client_secret": "w4gin1n4ujm8vaz6748o7", "redirect_url": "http://localhost:3000/callback/", "code": req.query.code }})
	.then(function (response) {
	    console.log(response);
	  })
	  .catch(function (error) {
	    console.log(error);
	  });
  res.sendFile(__dirname + '/public/profile.html');
});

// Return The Home Page
app.get('/callback/', function(req, res) {
	console.log(req.params);
		res.redirect('/profile?code=' + req.query.code);
});