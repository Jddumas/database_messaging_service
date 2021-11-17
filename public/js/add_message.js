// Get the objects we need to modify
let addMessageForm = document.getElementById('add-message-form-ajax');

// Modify the objects we need
addMessageForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputUsername = document.getElementById("input_username");
    let inputChannelName = document.getElementById("input_channel");
    let inputContent = document.getElementById("input_content");
    let inputTime = document.getElementById("input_time");
    let inputDate = document.getElementById("input_date");
    
    // Get the values from the form fields
    let messageUsernameValue = inputUsername.value;
    let messageChannelNameValue = inputChannelName.value;
    let messageContentValue = inputContent.value;
    let messageTimeValue = inputTime.value;
    let messageDateValue = inputDate.value;

    // Put our data we want to send in a javascript object
    let data = {
        username: messageUsernameValue,
        channel_name: messageChannelNameValue,
        content: messageContentValue,
        time: messageTimeValue,
        date: messageDateValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-message-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            messageUsernameValue.value = '';
            messageChannelNameValue.value = '';
            messageContentValue.value = '';
            messageTimeValue.value = '';
            messageDateValue.value = '';

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the message input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// bsg_people
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("message-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("tr");
    let messageIdCell = document.createElement("td");
    let messageUserCell = document.createElement("td");
    let messageChannelCell = document.createElement("td");   
    let messageTimeCell = document.createElement("td");   
    let messageDateCell = document.createElement("td");   
    let messageContentCell = document.createElement("td"); 
    
    // Fill the cells with correct data
    messageIdCell.innerText = newRow.message_id;
    messageUserCell.innerText = newRow.user;
    messageChannelCell.innerText = newRow.channel;
    messageTimeCell.innerText = newRow.time;
    messageDateCell.innerText = newRow.date;
    messageContentCell.innerText = newRow.content;
    
    // Add the cells to the row 
    row.appendChild(messageIdCell);
    row.appendChild(messageUserCell);
    row.appendChild(messageChannelCell);
    row.appendChild(messageTimeCell);
    row.appendChild(messageDateCell);
    row.appendChild(messageContentCell);

    // Add the row to the table
    currentTable.appendChild(row);
}