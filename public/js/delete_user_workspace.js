// Get the objects we need to modify
let deleteUserWorkspaceForm = document.getElementById('delete-user-workspace-form');

// Modify the objects we need
deleteUserWorkspaceForm.addEventListener("submit", function (e) {
  
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputUserId = document.getElementById("input_user_id_delete");
    let inputWorkspaceId = document.getElementById("input_workspace_id_delete");
    
    // Get the values from the form fields
    let userIdValue = inputUserId.value;
    let workspaceIdValue = inputWorkspaceId.value;

    // Put our data we want to send in a javascript object
    let data = {
        user_id: userIdValue,
        workspace_id: workspaceIdValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-user-workspace", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            
            // Clear the input fields for another transaction
            userIdValue.value = '';
            workspaceIdValue.value = '';

            // render the page again
            location.reload();

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the message_id input.")
        }
    }

    // Send the request and wait for the response
    console.log('data', data)
    xhttp.send(JSON.stringify(data));

})