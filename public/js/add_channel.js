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

            // // Add the new data to the table
            // addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputChannelName.value = '';
            inputWorkspaceName.value = '';
            inputCategoryName.value = '';

            location.reload();

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the channel input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})