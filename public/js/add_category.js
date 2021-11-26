// Get the objects we need to modify
let addCategoryForm = document.getElementById('add-category-form-ajax');

// Modify the objects we need
addCategoryForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputCategoryName = document.getElementById("input_category_name");
    

    // Get the values from the form fields
    let categoryNameValue = inputCategoryName.value;

    // Put our data we want to send in a javascript object
    let data = {
        category_name: categoryNameValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-category-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Clear the input fields for another transaction
            inputCategoryName.value = '';

            location.reload();

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the category input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})