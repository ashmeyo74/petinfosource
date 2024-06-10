const delay = ms => new Promise(res => setTimeout(res, ms));

const clear = document.querySelector("clearButton")
const hiddenDiv = document.getElementById("loadingScreen")


//  Waits for two seconds before fading out of the running cat gif
const loadContent = async () => {
    await delay(2000);
    hiddenDiv.style.animation = "fade-out 2s forwards";
    hiddenDiv.style.display = "hidden";
}

// Checks to see if the page is loaded, then runs the loadContent function
document.addEventListener("DOMContentLoaded", loadContent())


//  On click of a certain button on the form, will clear local storage. needs form creation though
function clearForm() {
    clear.addEventListener("onclick", function() {
        localStorage.clear();
        document.createTextNode("") // Fix to create element "Form cleared!"
    })
}

function taskReminder() {
// Renee
}