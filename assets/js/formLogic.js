//  Note: Put script here to serve as an error condition if user visits the page without specifying results
// function generateResult() {
//     //  function to generate form result dependant on local storage, generative elements with the createElement command
//     //  if/else statement?
//     //-Aiyana
// }

const hasPet = document.querySelector("#btn-yes")
const noPet = document.querySelector("#btn-no")
const petForm = document.getElementById("petForm")
const adoptForm = document.getElementById("adoptForm")

function generateResult() {
    // Get the container where the result will be displayed
    const resultContainer = document.getElementById('resultContainer');
    resultContainer.innerHTML = ''; // Clear any existing content

    // Retrieve data from local storage
    const petName = localStorage.getItem('petName');
    const species = localStorage.getItem('species');
    const breed = localStorage.getItem('breed');
    const location = localStorage.getItem('location');

    // Check if all data is available
    if (petName && species && breed && location) {
        // Create elements to display the result
        const nameElement = document.createElement('p');
        nameElement.textContent = `Pet Name: ${petName}`;
        resultContainer.appendChild(nameElement);

        const speciesElement = document.createElement('p');
        speciesElement.textContent = `Species: ${species}`;
        resultContainer.appendChild(speciesElement);

        const breedElement = document.createElement('p');
        breedElement.textContent = `Breed: ${breed}`;
        resultContainer.appendChild(breedElement);

        const locationElement = document.createElement('p');
        locationElement.textContent = `Location: ${location}`;
        resultContainer.appendChild(locationElement);
    } else {
        // Display a message if any data is missing
        const messageElement = document.createElement('p');
        messageElement.textContent = 'Some information is missing. Please complete the form.';
        resultContainer.appendChild(messageElement);
    }
}

//  Checks loclastorage and hides either petForm or adoptForm on conditional
 function formHide () {
    if (localStorage.getItem('petStatus') === 'true') {
        adoptForm.style.display = "none";
        petForm.style.display = "block";
    } else {
        petForm.style.display = "none";
        adoptForm.style.display = "block";
    }


}

// Saves the result of the button to local storage, then moves to forms.html
function saveYes() {
    localStorage.setItem('petStatus', 'true');
    window.location.href = "/forms.html";
}

// Saves the result of the button to local storage, then moves to forms.html
function saveNo() {
    localStorage.setItem('petStatus', 'false');
    window.location.href = "/forms.html";
}

//  Ensures that the page is currently  on '/forms/html' and that the DOM is properly loaded before running formHide()
document.addEventListener("DOMContentLoaded", function() {
    if (window.location.pathname === '/forms.html') {
        formHide();
    }
});