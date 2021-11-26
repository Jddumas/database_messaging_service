// Get the objects we need to modify
let filterUsernameForm = document.getElementById('filter-by-username');

// Modify the objects we need
filterUsernameForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let filterUsername = document.getElementById("input_username_filter");


    // Get the values from the form fields
    let filterUsernameValue = filterUsername.value;

    // Put our data we want to send in a javascript object
    let data = {
        username_filter: filterUsernameValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/filter-user-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // // Add the new data to the table
            // addRowToTable(xhttp.response);
            
            // Clear the input fields for another transaction
            filterUsername.value = '';

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the username filter input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// bsg_people
// addRowToTable = (data) => {

//     // Get a reference to the current table on the page and clear it out.
//     let currentTable = document.getElementById("workspace-table");

//     // Get the location where we should insert the new row (end of table)
//     let newRowIndex = currentTable.rows.length;

//     // Get a reference to the new row from the database query (last object)
//     let parsedData = JSON.parse(data);
//     let newRow = parsedData[parsedData.length - 1]

//     // Create a row and 5 cells
//     let row = document.createElement("tr");
//     let workspaceIdCell = document.createElement("td");
//     let workspaceNameCell = document.createElement("td");
//     let workspaceAdministratorCell = document.createElement("td");   
    
//     // Fill the cells with correct data
//     workspaceIdCell.innerText = newRow.workspace_id;
//     workspaceNameCell.innerText = newRow.workspace_name;
//     workspaceAdministratorCell.innerText = newRow.administrator;
    
//     // Add the cells to the row 
//     row.appendChild(workspaceIdCell);
//     row.appendChild(workspaceNameCell);
//     row.appendChild(workspaceAdministratorCell);

//     // Add the row to the table
//     currentTable.appendChild(row);
// }