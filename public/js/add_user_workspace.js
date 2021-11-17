// Get the objects we need to modify
let addUserWorkspaceForm = document.getElementById('add-user-workspace-form-ajax');

// Modify the objects we need
addUserWorkspaceForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputUsername = document.getElementById("input_username");
    let inputWorkspaceName = document.getElementById("input_workspace_name");

    // Get the values from the form fields
    let UsernameValue = inputUsername.value;
    let WorkspaceValue = inputWorkspaceName.value;

    // Put our data we want to send in a javascript object
    let data = {
        username: UsernameValue,
        workspace_name: WorkspaceValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-user-workspace-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            UsernameValue.value = '';
            WorkspaceValue.value = '';

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the user_workspace input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// bsg_people
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("users-workspaces-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 2 cells
    let row = document.createElement("tr");
    let usernameCell = document.createElement("td");
    let workspaceNameCell = document.createElement("td");
    
    // Fill the cells with correct data
    usernameCell.innerText = newRow.user_id;
    workspaceNameCell.innerText = newRow.workspace_id;
    
    // Add the cells to the row 
    row.appendChild(usernameCell);
    row.appendChild(workspaceNameCell);

    // Add the row to the table
    currentTable.appendChild(row);
}