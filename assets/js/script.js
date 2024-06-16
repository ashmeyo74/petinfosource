// If the user tries to visit the results page while local storage is empty, brings them back to the main page.

document.addEventListener("DOMContentLoaded", function() {
    if (window.location.pathname === '/results.html' && localStorage.getItem('petStatus') === null) {
        window.location.href = "/"
    }
});



const delay = ms => new Promise(res => setTimeout(res, ms));

const clear = document.querySelector("#clear")
const hiddenDiv = document.getElementById("loadingScreen")


//  Waits for two seconds before fading out of the running cat gif
const loadContent = async () => {
    hiddenDiv.style.animation = "fade-out 2s forwards";
    await delay(2000);
    hiddenDiv.remove();
}

// Checks to see if the page is loaded, then runs the loadContent function
document.addEventListener("DOMContentLoaded", loadContent())



//  On click of a certain button on the form, will clear local storage.
function clearForm() {
        if (window.confirm("Are you sure you want to start over?")) {
        localStorage.clear();
        window.location.href = "/";
        }
    }

function taskReminder() {
// Renee
}

