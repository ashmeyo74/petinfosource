document.addEventListener("DOMContentLoaded", function() {
    // Redirect if local storage is empty and trying to access results page
    if (window.location.pathname === '/results.html' && localStorage.getItem('petStatus') === null) {
        window.location.href = "/";
    }

    // Load content with a delay
    loadContent();
});

// Helper function to introduce a delay
const delay = ms => new Promise(res => setTimeout(res, ms));

const hiddenDiv = document.getElementById("loadingScreen");

// Function to load content after a delay
const loadContent = async () => {
    hiddenDiv.style.animation = "fade-out 2s forwards";
    await delay(2000);
    hiddenDiv.remove();
}

// Function to clear the form and reset local storage
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
function navigateToForm(choice) {
    if (choice === 'yes') {
        window.location.href = '/forms/newPetForm';
    } else if (choice === 'no') {
        window.location.href = '/forms/adoptionForm';
    }
}
