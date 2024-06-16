const hasPet = document.querySelector("#btn-yes");
const noPet = document.querySelector("#btn-no");
const petFormDiv = document.getElementById("petFormDiv");

const petSubmit = document.getElementById("hasPetSubmit");
const adoptSubmit = document.querySelector("#hasPetSubmit");
const petVet = document.getElementById("vetOffice");
const petGroomer = document.getElementById("groomerLink");
const errorCondition = document.getElementById("error-condition");

// Ensures DOM is fully loaded before listening for if the submit button is clicked on the pet form.
document.addEventListener('DOMContentLoaded', function () {
    const petForm = document.getElementById("petForm");

    if (petForm) {
        petForm.addEventListener('submit', function (event) {
            event.preventDefault();
            savePetResult();
        });
    }
});

// Ensures DOM is fully loaded before listening for if the submit button is clicked on the adopt form.
document.addEventListener('DOMContentLoaded', function () {
    const adoptForm = document.getElementById("adoptForm");

  if (adoptForm) {
    adoptForm.addEventListener("submit", function (event) {
        event.preventDefault();
        saveAdoptResult()
    });
}
});

//  Function that saves pet form result to cookies
function savePetResult() {
  let petRadioYes = document.getElementById("yes");
  let isPetVetValid = petVet.checkValidity() || !petVet.value;
  let isPetGroomerValid = petGroomer.checkValidity() || !petGroomer.value;

  // ensures that everything that's required is included before running anything
  if (petForm.checkValidity()) {
    //  checks to make sure petVet and petGroomer are valid links, else returns an error
    if (!isPetVetValid || !isPetGroomerValid) {
      errorCondition.textContent = "Error! Please supply a valid link.";
      return; // Exit the function if validation fails
    }

    // Saves form results to an array
    let petFormArray = {
      PetName: document.getElementById("petName").value,
      PetSpecies: document.getElementById("petSpecies").value,
      petBreed: document.getElementById("petBreed").value,
      vetOffice: document.getElementById("vetOffice").value,
      groomerLink: document.getElementById("groomerLink").value,
    };

    // saves array as a cookie
    document.cookie = "Pet Form Cookie:" + JSON.stringify(petFormArray);
    console.log(document.cookie);

    //  If 'Do you want another pet' is checked to 'yes', unhides adoption form. Otherwise brings user to results page
    if (petRadioYes.checked) {
      adoptForm.style.display = "block";
      petFormDiv.style.display = "none";
    } else {
      window.location.href = "/results.html";
    }
  }
}

//  Function that saves adopt form result to cookies
function saveAdoptResult() {
  // Saves form results to an array
  let adoptFormArray = {
    Species: document.getElementById("adoptSpecies").value,
    Breed: document.getElementById("adoptBreed").value,
    Location: document.getElementById("yourLocation").value,
  };
}

function generateResult() {
  // Get the container where the result will be displayed
  const resultContainer = document.getElementById("resultContainer");
  resultContainer.innerHTML = ""; // Clear any existing content

  // Retrieve data from local storage
  const petName = localStorage.getItem("petName");
  const species = localStorage.getItem("species");
  const breed = localStorage.getItem("breed");
  const location = localStorage.getItem("location");

  // Check if all data is available
  if (petName && species && breed && location) {
    // Create elements to display the result
    const nameElement = document.createElement("p");
    nameElement.textContent = `Pet Name: ${petName}`;
    resultContainer.appendChild(nameElement);

    const speciesElement = document.createElement("p");
    speciesElement.textContent = `Species: ${species}`;
    resultContainer.appendChild(speciesElement);

    const breedElement = document.createElement("p");
    breedElement.textContent = `Breed: ${breed}`;
    resultContainer.appendChild(breedElement);

    const locationElement = document.createElement("p");
    locationElement.textContent = `Location: ${location}`;
    resultContainer.appendChild(locationElement);
  } else {
    // Display a message if any data is missing
    const messageElement = document.createElement("p");
    messageElement.textContent =
      "Some information is missing. Please complete the form.";
    resultContainer.appendChild(messageElement);
  }
}

//  Checks loclastorage and hides either petForm or adoptForm on conditional
function formHide() {
  if (localStorage.getItem("petStatus") === "true") {
    adoptForm.style.display = "none";
    petFormDiv.style.display = "block";
  } else {
    petFormDiv.style.display = "none";
    adoptForm.style.display = "block";
  }
}

// Saves the result of the button to local storage, then moves to forms.html
function saveYes() {
  localStorage.setItem("petStatus", "true");
  window.location.href = "/forms.html";
}

// Saves the result of the button to local storage, then moves to forms.html
function saveNo() {
  localStorage.setItem("petStatus", "false");
  window.location.href = "/forms.html";
}

//  Ensures that the page is currently  on '/forms/html' and that the DOM is properly loaded before running formHide()
document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname === "/forms.html") {
    formHide();
  }
});
