const db = require('./database');

module.exports.getUsers = function(req, res) {
    db.then(function(connection){
        console.log('con');
        // query database 
        connection.query("SELECT * FROM users", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
      });
    });
};

