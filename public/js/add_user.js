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

            // Clear the input fields for another transaction
            inputUsername.value = '';
            inputFirstName.value = '';
            inputLastName.value = '';
            inputEmail.value = '';

            location.reload();

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the user input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})
