// Get the objects we need to modify
let deleteMessageForm = document.getElementById('delete-message-form');

// Modify the objects we need
deleteMessageForm.addEventListener("submit", function (e) {
  
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputMessageId = document.getElementById("input_message_id_delete");
    
    // Get the values from the form fields
    let messageIdValue = inputMessageId.value;

    // Put our data we want to send in a javascript object
    let data = {
        message_id: messageIdValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-message", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            
            // Clear the input fields for another transaction
            inputMessageId.value = '';

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