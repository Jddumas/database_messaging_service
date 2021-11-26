// Get the objects we need to modify
let addUserForm = document.getElementById('add-user-form-ajax');

// Modify the objects we need
addUserForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputUsername = document.getElementById("input_username");
    let inputFirstName = document.getElementById("input_first_name");
    let inputLastName = document.getElementById("input_last_name");
    let inputEmail = document.getElementById("input_email");

    // Get the values from the form fields
    let userUsernameValue = inputUsername.value;
    let userFirstNameValue = inputFirstName.value;
    let userLastNameValue = inputLastName.value;
    let userEmailValue = inputEmail.value;

    // Put our data we want to send in a javascript object
    let data = {
        username: userUsernameValue,
        first_name: userFirstNameValue,
        last_name: userLastNameValue,
        email: userEmailValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-user-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputUsername.value = '';
            inputFirstName.value = '';
            inputLastName.value = '';
            inputEmail.value = '';

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the user input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// bsg_people
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("user-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 5 cells
    let row = document.createElement("tr");
    let userIdCell = document.createElement("td");
    let userUsernameCell = document.createElement("td");
    let userFirstNameCell = document.createElement("td");
    let userLastNameCell = document.createElement("td");
    let userEmailCell = document.createElement("td");
    
    
    // Fill the cells with correct data
    userIdCell.innerText = newRow.user_id;
    userUsernameCell.innerText = newRow.username;
    userFirstNameCell.innerText = newRow.first_name;
    userLastNameCell.innerText = newRow.last_name;
    userEmailCell.innerText = newRow.email;
    
    // Add the cells to the row 
    row.appendChild(userIdCell);
    row.appendChild(userUsernameCell);
    row.appendChild(userEmailCell);
    row.appendChild(userFirstNameCell);
    row.appendChild(userLastNameCell);
   

    // Add the row to the table
    currentTable.appendChild(row);
}