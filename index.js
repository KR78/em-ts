'use strict'

/**
 * Dependencies
 */

const http = require('http'),
	  express = require('express'),
	  // socket = require('socket.io-client')('http://localhost:3000/'),
	  app = module.exports.app = express(),
	  server = http.createServer(app),
      io = require('socket.io')(server); //pass a http.Server instance

//Modules
const db = require('./modules/database');
const ct = require('./modules/controller');
const emms = require('./modules/serve_emma');


db.then(function(){
	ct.getUsers();
});
