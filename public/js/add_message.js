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

            // Clear the input fields for another transaction
            messageUsernameValue.value = '';
            messageChannelNameValue.value = '';
            messageContentValue.value = '';
            messageTimeValue.value = '';
            messageDateValue.value = '';

            // render page
            location.reload();

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the message input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})

