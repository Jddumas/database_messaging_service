// Get the objects we need to modify
let addWorkspaceForm = document.getElementById('add-workspace-form-ajax');

// Modify the objects we need
addWorkspaceForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputWorkspaceName = document.getElementById("input_workspace_name");
    let inputAdministrator = document.getElementById("input_administrator");


    // Get the values from the form fields
    let workspaceNameValue = inputWorkspaceName.value;
    let workspaceAdministratorValue = inputAdministrator.value;

    // Put our data we want to send in a javascript object
    let data = {
        workspace_name: workspaceNameValue,
        administrator: workspaceAdministratorValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-workspace-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Clear the input fields for another transaction
            inputWorkspaceName.value = '';
            inputAdministrator.value = '';

            location.reload();
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the workspace input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})