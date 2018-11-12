'use strict'

/**
 * Dependencies
 */

const http = require('http'),
	  express = require('express'),
      app = module.exports.app = express(),
	  server = http.createServer(app),
      io = require('socket.io')(server), //pass a http.Server instance
	  socket = require('socket.io-client')('http://localhost:3000/'),
	  EmmaServe = require("serve-me");

//Config
const serve_emma = EmmaServe({
    debug: true,
    log: true,
    home: "index.html",
    directory: "./public",
    error: {
        404: "404.html"
    },
    secure: false,
});

//Also you can add a callback to wait for the server to start.
serve_emma.start(process.env.PORT || 3000, function(){
    console.log("I'm alive!");
});

serve_emma.get("/", "/index.html")
