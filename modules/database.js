const mysql = require('mysql');
const config = require('config'),

var db = new Promise(function(resolve, reject){
	const con = mysql.createConnection({
	  host: config.get('host'),
	  user: config.get('user'),
	  password: config.get('password')
	});

	con.connect(function(err) {
  	if (err) throw err;
  	console.log("Connected!");
	});
});

module.exports = db;