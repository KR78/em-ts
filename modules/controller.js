const database = require('./database');

module.exports.getUsers = function(req, res) {
    database.then(function(connection){
        // query database 
        connection.query('SELECT * FROM `users`', function(error, results, fields) {
            if (error) {
                console.log(error);
                return;
            }
            console.log(results);
            res.send(results);
        });
    });
};