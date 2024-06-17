const hasPet = document.querySelector("#btn-yes");
const noPet = document.querySelector("#btn-no");
const petVet = document.getElementById("vetOffice");
const petGroomer = document.getElementById("groomerLink")
const petFormDiv = document.getElementById("petFormDiv");
const petSubmit = document.getElementById("hasPetSubmit");
const adoptSubmit = document.querySelector("#hasPetSubmit");

const errorCondition = document.getElementById("error-condition");

// Ensures DOM is fully loaded before listening for if the submit button is clicked on the pet form.
document.addEventListener("DOMContentLoaded", function () {
  const petForm = document.getElementById("petForm");

  if (petForm) {
    petForm.addEventListener("submit", function (event) {
      event.preventDefault();
      savePetResult();
    });
  }
});

// Ensures DOM is fully loaded before listening for if the submit button is clicked on the adopt form.
document.addEventListener("DOMContentLoaded", function () {
  const adoptForm = document.getElementById("adoptForm");

  if (adoptForm) {
    adoptForm.addEventListener("submit", function (event) {
      event.preventDefault();
      saveAdoptResult();
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

    // Get existing pet form array from local storage or initialize an empty array
    let petFormArray = JSON.parse(localStorage.getItem("petFormArray")) || [];

    // Pushes form results to array
    petFormArray.push({
      petName: document.getElementById("petName").value,
      petSpecies: document.getElementById("petSpecies").value,
      petBreed: document.getElementById("petBreed").value,
      vetOffice: document.getElementById("vetOffice").value,
      groomerLink: document.getElementById("groomerLink").value,
      petAllergies: document.getElementById("petAllergies").value,
      petFavorites: document.getElementById("petFavorites").value,
    });

    // Saves array to local storage
    localStorage.setItem("petFormArray", JSON.stringify(petFormArray));

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
  const petInfoDiv = document.getElementById("myPetInfo");
  const currentPets = document.getElementById("currentPets");
  resultContainer.innerHTML = ""; // Clear any existing content

  // Retrieve pets array from local storage
  const petFormArray = JSON.parse(localStorage.getItem("petFormArray")) || [];

  // Check if there are any pets stored
  if (petFormArray.length > 0) {
    // Iterate over each pet and create elements to display their information
    petFormArray.forEach((pet) => {
     // Create a container for each pet's information
          // ----- Appends to the left, currentPets
        const petDiv = document.createElement("div");
        petDiv.classList.add("col-md-2", "text-center", "mt-5", "bg-light", "results-column");
        petDiv.innerHTML = `<h3>${pet.petName}</h3>`; 

        const speciesElement = document.createElement("p");
        speciesElement.textContent = `Species: ${pet.petSpecies}`;
        petDiv.appendChild(speciesElement);
  
        const breedElement = document.createElement("p");
        breedElement.textContent = `Breed: ${pet.petBreed}`;
        petDiv.appendChild(breedElement);


      // ----- Appends to middle div, PetInfo
      
        const petNameInfo = document.createElement("h4"); 
        petNameInfo.innerHTML = `${pet.petName}`;
        petInfoDiv.appendChild(petNameInfo);

        if (pet.vetLink) { 
          const vetLink = document.createElement("p");
          vetLink.textContent = `Link to Vet Office: ${pet.vetLink}`;
          petInfoDiv.appendChild(vetLink);
        };

        if (pet.groomerLink) { 
          const groomerLink = document.createElement("p");
          groomerLink.textContent = `Link to Groomer: ${pet.groomerLink}`;
          petInfoDiv.appendChild(groomerLink);
        };

        const petAllergies = document.createElement("p");
        if (pet.petAllergies) {
          petAllergies.textContent = `Known Allergies: ${pet.petAllergies}`
        } else {
          petAllergies.textContent = "No Known Allergies!"
        }
        petInfoDiv.appendChild(petAllergies);

        const petFavorites = document.createElement("p");
        petFavorites.textContent = `My Pet's Favorite Things: ${pet.petFavorites}`;
        petInfoDiv.appendChild(petFavorites);

      // Append each pet's information to the result container
      currentPets.appendChild(petDiv);
      resultContainer.appendChild(currentPets);
      resultContainer.appendChild(petInfoDiv);

      //   // Attempt to assign a class that hides an element based on index #, needs further review
      // petFormArray.forEach((index) => { 
      //   if (index === 0) {
      //     petDiv.classList.add("mainPet");
      //   } else {
      //     petDiv.classList.add("notMain");
      //   }
      // })

    });
  } else {
    // Display a message if any data is missing
    const messageElement = document.createElement("p");
    messageElement.textContent =
      "Some information is missing. Please complete the form.";
    resultContainer.appendChild(messageElement);
  }



}


// Runs the generateResult() function when window is loaded
if (window.location.pathname === "/results.html") {
    generateResult();
  }

//  Checks localstorage and hides either petForm or adoptForm on conditional
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
