const db = require('./database');

module.exports.getUsers = function(req, res) {
    db.then(function(connection){
        console.log('con');
        // query database 
        connection.query("SELECT * FROM users", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        return result;
      });
    });
};

module.exports.storeTransactions = function(req, res) {
    db.then(function(connection){
        console.log('con');
        // query database 
        connection.query("SELECT * FROM users", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
      });
    });
};

module.exports.storeAccounts = function(acnts) {
    var data = acnts; // fetch all the accounts
    var accounts_data = [] // create empty array to push accounts data

    data.forEach(function(acnt) {
      var account = [acnt.account_id, acnt.account_type, acnt.currency, acnt.display_name, acnt.provider.display_name];
      accounts_data.push(account); // push each account to array
    });

    console.log(accounts_data);
    // Insert to DB and escape
    db.then(function(connection){
        console.log('con');
        // query database 
        var statmnt = "INSERT INTO accounts (account_id, account_type, currency, display_name, provider) VALUES ?"
        connection.query(statmnt, [accounts_data], function (err, result, fields) {
        if (err) throw err;
        console.log(result);
      });
    });
};