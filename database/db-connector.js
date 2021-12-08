// Get an instance of mysql we can use in the app
var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'us-cdbr-east-04.cleardb.com',
    user            : 'b0124278ed988f',
    password        : 'd9f45ea9',
    database        : 'heroku_6b26380cebe4a26'
})

// Export it for use in our applicaiton
module.exports.pool = pool;
