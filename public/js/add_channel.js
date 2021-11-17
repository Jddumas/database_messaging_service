// Get the objects we need to modify
let addChannelForm = document.getElementById('add-channel-form-ajax');

// Modify the objects we need
addChannelForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputChannelName = document.getElementById("input_channel_name");
    let inputWorkspaceName = document.getElementById("input_workspace_name");
    let inputCategoryName = document.getElementById("input_category_name");

    // Get the values from the form fields
    let channelNameValue = inputChannelName.value;
    let channelWorkspaceNameValue = inputWorkspaceName.value;
    let channelCategoryNameValue = inputCategoryName.value;


    // Put our data we want to send in a javascript object
    let data = {
        channel_name: channelNameValue,
        workspace_name: channelWorkspaceNameValue,
        category_name: channelCategoryNameValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-channel-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputChannelName.value = '';
            inputWorkspaceName.value = '';
            inputCategoryName.value = '';

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the channel input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// bsg_people
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("channel-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("tr");
    let channelIdCell = document.createElement("td");
    let channelNameCell = document.createElement("td");
    let channelWorkspaceIdCell = document.createElement("td");   
    let channelCategoryIdCell = document.createElement("td");   
    
    // Fill the cells with correct data
    channelIdCell.innerText = newRow.channel_id;
    channelNameCell.innerText = newRow.channel_name;
    channelWorkspaceIdCell.innerText = newRow.workspace_id;
    channelCategoryIdCell.innerText = newRow.category_id;
    
    // Add the cells to the row 
    row.appendChild(channelIdCell);
    row.appendChild(channelNameCell);
    row.appendChild(channelWorkspaceIdCell);
    row.appendChild(channelCategoryIdCell);

    // Add the row to the table
    currentTable.appendChild(row);
}