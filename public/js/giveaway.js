// CONNECT EXNESS 
function showDetails(title, content) {
    const toggleBox = document.getElementById("toggle-box");
    const toggleTitle = document.getElementById("toggle-title");
    const toggleContent = document.getElementById("toggle-content");

    // Update the toggle box content
    toggleTitle.textContent = title;
    toggleContent.textContent = content;

    // Add the 'active' class to make it visible and slide out
    toggleBox.classList.add('active');
}

function closeDetails() {
    const toggleBox = document.getElementById("toggle-box");

    // Remove the 'active' class to hide and slide the box back
    toggleBox.classList.remove('active');
}




// ADS SLIDE 
document.addEventListener('DOMContentLoaded', () => {
    const ads = document.querySelectorAll('#ads-container img');
    let currentAdIndex = 0;

    // Function to switch ads
    function showNextAd() {
        // Remove the active class from the current ad
        ads[currentAdIndex].classList.remove('active');

        // Calculate the next ad index
        currentAdIndex = (currentAdIndex + 1) % ads.length;

        // Add the active class to the next ad
        ads[currentAdIndex].classList.add('active');
    }

    // Initialize the slideshow
    ads[currentAdIndex].classList.add('active'); // Show the first ad
    setInterval(showNextAd, 5000); // Switch ads every 5 seconds
});




