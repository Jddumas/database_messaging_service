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
    query1 = "SELECT user_id, username, email, first_name, last_name FROM Users;"
    db.pool.query(query1, function(error, rows, fields){
        res.render('users', {data: rows});
    })
});

// Filter by username - POST
app.post('/filter-user-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // If there was no error, perform a SELECT * on bsg_people
    filter_users_query = `SELECT user_id, email, username, first_name, last_name FROM Users WHERE username='${data.username_filter}';`;
    console.log("filter_users_query", filter_users_query)
    db.pool.query(filter_users_query, function(error, rows, fields){

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
            // res.send(rows);
            res.render('users', {data: rows});
        }
    })
    
});

// Create User - POST
app.post('/add-user-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    create_user_query = `INSERT INTO Users (username, email, first_name, last_name) 
                          VALUES ('${data.username}', '${data.email}', '${data.first_name}', '${data.last_name}')`;

    db.pool.query(create_user_query, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            read_users_query = `SELECT user_id, email, username, first_name, last_name FROM Users;`;
            db.pool.query(read_users_query, function(error, rows, fields){

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












// Workspaces Route 
// Load Workspaces page - GET
app.get('/workspaces', function(req, res)
{
    query1 = "SELECT * FROM Workspaces;"
    db.pool.query(query1, function(error, rows, fields){
        res.render('workspaces', {data: rows});
    })});

// Create Workspaces - POST
app.post('/add-workspace-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    admin_query = `(SELECT user_id FROM Users WHERE username="${data.administrator}")`
    create_workspace_query = `INSERT INTO Workspaces (workspace_name, administrator) VALUES ('${data.workspace_name}', ${admin_query})`;

    db.pool.query(create_workspace_query, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            read_workspaces_query = "SELECT * FROM Workspaces;";
            db.pool.query(read_workspaces_query, function(error, rows, fields){

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


// Channels Route
// Load Channels page - GET
app.get('/channels', function(req, res)
{
    query1 = "SELECT * FROM Channels;"
    db.pool.query(query1, function(error, rows, fields){
        res.render('channels', {data: rows});
    })});

// Create Channels - POST
app.post('/add-channel-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    workspace_query = `(SELECT workspace_id FROM Workspaces WHERE workspace_name="${data.workspace_name}")`
    category_query = `(SELECT category_id FROM Categories WHERE category_name="${data.category_name}")`
    
    create_channel_query = `INSERT INTO Channels (channel_name, workspace_id, category_id) VALUES ('${data.channel_name}', ${workspace_query}, ${category_query})`;

    db.pool.query(create_channel_query, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            read_channels_query = "SELECT * FROM Channels;";
            db.pool.query(read_channels_query, function(error, rows, fields){

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
// Load Messages page - GET
app.get('/messages', function(req, res)
{
    query1 = "SELECT * FROM Messages;"
    db.pool.query(query1, function(error, rows, fields){
        res.render('messages', {data: rows});
    })
});

// Create Message - POST
app.post('/add-message-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    user_query = `(SELECT user_id FROM Users WHERE username="${data.username}")`
    channel_query = `(SELECT channel_id FROM Channels WHERE channel_name="${data.channel_name}")`
    create_message_query = `INSERT INTO Messages (user, channel, time, date, content) VALUES (${user_query}, ${channel_query}, '${data.time}', '${data.date}', '${data.content}')`;

    db.pool.query(create_message_query, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on Messages
            read_messages_query = "SELECT * FROM Messages;";
            db.pool.query(read_messages_query, function(error, rows, fields){

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

// Delete Message - DELETE
app.delete('/delete-message', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    // message_id_query = `(SELECT user_id FROM Users WHERE username="${data.username}")`
    delete_query = `DELETE FROM Messages WHERE message_id = ${data.message_id};`

    db.pool.query(delete_query, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on Users
            read_users_query = "SELECT * FROM Messages;";
            db.pool.query(read_users_query, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    // console.log(rows)
                    res.send(rows);
                }
            })
        }
    })
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

// Update a Category - PUT
app.put('/update-category-ajax', function(req, res)
{
    // Capture incoming data from request body and store into data variable
    let data = req.body;

    update_query = `UPDATE Categories SET category_name = "${data.category_name}" 
                        WHERE category_id = "${data.category_id}"`

    db.pool.query(update_query, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on Categories
            read_categories_query = `SELECT * FROM Categories`;
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



// Users_Workspaces Route
// Load Users_Workspaces page - GET
app.get('/users_workspaces', function(req, res)
{
    query1 = "SELECT * FROM Users_Workspaces;"
    db.pool.query(query1, function(error, rows, fields){
        res.render('users_workspaces', {data: rows});
    })
});

// Create User_Workspace - POST
app.post('/add-user-workspace-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    user_query = `(SELECT user_id FROM Users WHERE username="${data.username}")`
    workspace_query = `(SELECT workspace_id FROM Workspaces WHERE workspace_name="${data.workspace_name}")`
    create_user_workspace_query = `INSERT INTO Users_Workspaces (user_id, workspace_id) VALUES (${user_query}, ${workspace_query})`;


    // query1 = `INSERT INTO bsg_people (fname, lname, homeworld, age) VALUES ('${data.fname}', '${data.lname}', ${homeworld}, ${age})`;
    db.pool.query(create_user_workspace_query, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on Users_Workspaces
            read_users_workspaces_query = `SELECT * FROM Users_Workspaces`;
            db.pool.query(read_users_workspaces_query, function(error, rows, fields){

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

// Delete User Workspace - DELETE
app.delete('/delete-user-workspace', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    // message_id_query = `(SELECT user_id FROM Users WHERE username="${data.username}")`
    delete_query = `DELETE FROM Users_Workspaces WHERE user_id = ${data.user_id} AND workspace_id = ${data.workspace_id};`

    db.pool.query(delete_query, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on Users Workspaces
            read_users_query = "SELECT * FROM Users_Workspaces;";
            db.pool.query(read_users_query, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    // console.log(rows)
                    res.send(rows);
                }
            })
        }
    })
});


// Example Route
app.get('/example', function(req, res)
{
    res.render('example');
});


/*
    LISTENER
*/
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
