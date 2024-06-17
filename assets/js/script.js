// Ensure DOMContentLoaded event to handle certain functionalities
document.addEventListener("DOMContentLoaded", function() {
    // Redirect to main page if trying to visit results page without petStatus in local storage
    if (window.location.pathname === '/results.html' && localStorage.getItem('petStatus') === null) {
        window.location.href = "/";
    }
    
    // Load content when page is ready
    loadContent();
});

// Function to create a delay
const delay = ms => new Promise(res => setTimeout(res, ms));

// Function to handle loading screen animation and removal
const hiddenDiv = document.getElementById("loadingScreen");

const loadContent = async () => {
    hiddenDiv.style.animation = "fade-out 2s forwards";
    await delay(2000);
    hiddenDiv.remove();
};

// Function to clear local storage and redirect to the main page
function clearForm() {
    if (window.confirm("Are you sure you want to start over?")) {
        localStorage.clear();
        window.location.href = "/";
    }
}

// Placeholder function for task reminders
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
