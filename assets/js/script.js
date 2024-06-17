// Existing code
document.addEventListener("DOMContentLoaded", function() {
    if (window.location.pathname === '/results.html' && localStorage.getItem('petStatus') === null) {
        window.location.href = "/";
    }
});

const delay = ms => new Promise(res => setTimeout(res, ms));

const clear = document.querySelector("#clear");
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

// New code for loading forms dynamically
function showFormsPage(choice) {
    fetch('forms.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('main-container').innerHTML = data;

            // Simulate click based on choice
            if (choice === 'yes') {
                document.getElementById('link-new-pet').click();
            } else {
                document.getElementById('link-adopt').click();
            }
        })
        .catch(error => console.error('Error loading forms:', error));
}
