const mysql = require('mysql');
const config = require('config');

var db = new Promise(function(resolve, reject){
	const con = mysql.createConnection({
	  host: config.get('host'),
	  user: config.get('username'),
	  password: config.get('password'),
	  database: config.get('database')
	});

	con.connect(function(err) {
	  	if (err) {
	        reject(err);
	    } else {
	  		resolve(con);
	    }
	});

});

module.exports = db;