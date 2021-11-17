// Express
var express = require('express');
var app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))

PORT = 9992;

// Database
var db = require('./database/db-connector');

// Handlebars
var exphbs = require('express-handlebars');
const { query } = require('express');
app.engine('.hbs', exphbs({
    extname: ".hbs"
}));
app.set('view engine', '.hbs');

// Static Files
app.use(express.static('public'));

/*
    ROUTES
*/

// GET ROUTES
// app.get('/', function(req, res)
// {
    // let query1 = "SELECT * FROM bsg_people;";
//     db.pool.query(query1, function(error, rows, fields){
//         res.render('index', {data: rows});
//     })
// });

// Index Route
app.get('/', function(req, res)
{
    res.render('index');
});

// Users Route
// Load Users page - GET
app.get('/users', function(req, res)
{
    query1 = "SELECT * FROM Users;"
    db.pool.query(query1, function(error, rows, fields){
        res.render('users', {data: rows});
    })
});




// Workspaces Route
app.get('/workspaces', function(req, res)
{
    res.render('workspaces');
});

// Channels Route
app.get('/channels', function(req, res)
{
    res.render('channels');
});

// Categories Route
// Load Categories page - GET
app.get('/categories', function(req, res)
{
    query1 = "SELECT * FROM Categories;"
    db.pool.query(query1, function(error, rows, fields){
        res.render('categories', {data: rows});
    })
});

// Create Category - POST
app.post('/add-category-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let category_name = parseInt(data.category_name);
    if (isNaN(category_name))
    {
        category_name = 'NULL'
    }

    // Create the query and run it on the database
    create_category_query = `INSERT INTO Categories (category_name) VALUES ('${data.category_name}')`;
    
    // query1 = `INSERT INTO bsg_people (fname, lname, homeworld, age) VALUES ('${data.fname}', '${data.lname}', ${homeworld}, ${age})`;
    db.pool.query(create_category_query, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            read_categories_query = `SELECT * FROM Categories`;
            // query2 = `SELECT * FROM bsg_people;`;
            db.pool.query(read_categories_query, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    console.log(rows)
                    res.send(rows);
                }
            })
        }
    })
});

// Messages Route
app.get('/messages', function(req, res)
{
    res.render('messages');
});

// Users_Workspaces Route
app.get('/users_workspaces', function(req, res)
{
    res.render('users_workspaces');
});

// Example Route
app.get('/example', function(req, res)
{
    res.render('example');
});

// POST ROUTES







/*
    LISTENER
*/
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
