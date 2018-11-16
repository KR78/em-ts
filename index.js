'use strict'

/**
 * Dependencies
 */

const http = require('http'),
	  path = require('path'),
	  config = require('config'),
      express = require('express'),
      curl = new (require( 'curl-request' ))(),
      app = module.exports.app = express(),
      axios = require('axios'),
	  server = http.createServer(app),
	  localStorage = require('localStorage'),
      io = require('socket.io')(server); //pass a http.Server instance

const socket = require('socket.io-client')('http://localhost:3000');

global.AUTH_TOKEN = '';

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

/**
 * Modules
 */
const db = require('./modules/database');
const ct = require('./modules/controller');

/**
 * Get List of Transactions by ID
 */
function fetchTranscations(id){
	curl.setHeaders([
    'Authorization: Bearer '+ token
		])
		.get('https://api.truelayer.com/data/v1/accounts/'+id+'/transactions')
		.then(({statusCode, body, headers}) => {
		    console.log(statusCode, body, headers)
		    var data = body.results;
		    ct.storeTransactions(data);
		})
		.catch((e) => {
		    console.log(e);
		});
}
/**
 * Get List of Transactions by ID and Store Logs
 */
function fetchTranscationsAndLog(id){
	// Start tracking time
	var start = new Date()
	var tracker_start = process.hrtime()
	// Make the curl request
	curl.setHeaders([
    'Authorization: Bearer '+ token
		])
		.get('https://api.truelayer.com/data/v1/accounts/'+id+'/transactions')
		.then(({statusCode, body, headers}) => {
		    console.log(statusCode, body, headers)
		    // End tracking time
		    var end_time = new Date() - start;
    		var tracker_end = process.hrtime(tracker_start);
    		// Get data from TrueLayer
		    var data = body.results;
		    ct.storeTransactions(data);
		    // Pass transactions and log time
		    ct.storeLogs(data, end_time);
		})
		.catch((e) => {
		    console.log(e);
		});
}
/**
 * Get List of Accounts
 */
function getAccountsAndTransactions(token){
	curl.setHeaders([
    'Authorization: Bearer '+ token
		])
		.get('https://api.truelayer.com/data/v1/accounts')
		.then(({statusCode, body, headers}) => {
		    console.log(statusCode, body, headers)
		    // Get the account_id of the first account
		    var accnt_id = body.results[0].account_id
		    //store the transations 
			ct.storeAccounts(body.results).then(() => {
				// get Transactions of first account after storing accounts
		    	fetchTransactions(body.results[0].account_id)
			});
		})
		.catch((e) => {
		    console.log(e);
		});
}

// Allow Get Requests For The APP's Assets
app.use('/public/socket.io', express.static(path.join(__dirname, 'public/socket.io')));

// Return The Home Page
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

// Return The Home Page
app.get('/callback/', function(req, res) {
	console.log(req.params);
		res.redirect('/profile?code=' + req.query.code);
});

// Get Transactions
app.get('/transactions', function(req, res) {
	return 'Fetching data...'
	ct.getTransactions();
	console.log(req.params);
});

// Return The Profile Page
app.get('/profile', function(req, res) {
	// io.emit('auth_token', req.query.code); // emit token to client using socket.io
	console.log(req.query.code);
	//Get auth token
	  curl
		.setBody({
		 'grant_type': "authorization_code",
		 'client_id': config.get('client_id'),
		 'client_secret': config.get('client_secret'),
		 'redirect_url': config.get('redirect_url'),
		 'code': req.query.code
		})
		.post('https://auth.truelayer.com/connect/token')
		.then(({statusCode, body, headers}) => {
		    console.log(statusCode, body, headers)
		    AUTH_TOKEN = body.access_token;
		    getAccountsAndTransactions(AUTH_TOKEN);
		})
		.catch((e) => {
		    console.log(e);
		});
  res.sendFile(__dirname + '/public/profile.html');
});

