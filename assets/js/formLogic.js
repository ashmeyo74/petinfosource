const form = document.getElementById("forms")
const formLinks = document.querySelector("formLinks")

//  Needs literally everything, Listen for submit form
function resultError() {
   //  Note: Put script here to serve as an error condition if user visits the page without specifying results
   // - Ashley
}

function parseForm() {
    //  converts  form elements to text strings, ensures that links entered are actually links
    form.addEventListener("submit", function() {
        //  Checks to see if entered link is valid
        if (!formLinks.checkValidity()) {
            //  Create text node here at the bottom of the form "Please enter a valid link!"
        } else {
            //  Submit form
        }
    })
}

//  Waiting to see finalized forms
function chooseForm() {
    //  Hides certain form on forms.html based on which option was selected 
       // - Ashley // CJ

       parseForm()
}



function formResult() {
    //  Function to listen and apply form result to local storage. Moves pages after form is submitted
    // The following steps should be taken and logged to local storage, if relevant
    // 1. Basic form results
    // 3. Move pages afterwards
    // - CJ
    
}

//  Waiting on API
function generatePet() {
    // pulls from local storage and uses an API to generate a pet image based on results from formResult
       // - Ashley // CJ
}

function generateResult() {
    //  function to generate form result dependant on local storage, generative elements with the createElement command
    //  if/else statement?
    //-Aiyana
}