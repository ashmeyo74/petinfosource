// If the user tries to visit the results page while local storage is empty, brings them back to the main page.
document.addEventListener("DOMContentLoaded", function() {
    if (window.location.pathname === '/results.html' && localStorage.getItem('petStatus') === null) {
        window.location.href = "/";
    }
});

const delay = ms => new Promise(res => setTimeout(res, ms));

const hiddenDiv = document.getElementById("loadingScreen");

const loadContent = async () => {
    hiddenDiv.style.animation = "fade-out 2s forwards";
    await delay(2000);
    hiddenDiv.remove();
}

document.addEventListener("DOMContentLoaded", loadContent);

function clearForm() {
    if (window.confirm("Are you sure you want to start over?")) {
        localStorage.clear();
        window.location.href = "/";
    }
}

function taskReminder() {
    // Renee
}

// Function to handle redirection based on user choice
function showFormsPage(choice) {
    fetch('forms.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('main-container').innerHTML = data;

            // Wait for the content to be added to the DOM
            setTimeout(() => {
                if (choice === 'yes') {
                    document.getElementById('link-new-pet').click();
                } else {
                    document.getElementById('link-adopt').click();
                }
            }, 0);
        })
        .catch(error => console.error('Error loading forms:', error));
}
