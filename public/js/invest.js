// PASS TO ACCESS PASS PAGE 
// Function to set the price dynamically and submit the form
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".btn.price__btn");

  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent default form submission

      // Find the closest price card
      const card = button.closest(".price__card");

      // Extract the value of <h3> from the card
      const price = card.querySelector(".price-details h3").textContent;

      // Set the value in the hidden input
      const hiddenInput = card.querySelector('input[name="htmlContent"]');
      hiddenInput.value = price;

      // Submit the form programmatically
      card.querySelector("form").submit();
    });
  });
});






// GURUS LIST 
const gurusContainer = document.querySelector('.gurus');
const gurusImages = document.querySelectorAll('.gurus img');

// Duplicate the images to create an infinite scrolling effect
gurusImages.forEach(img => {
    gurusContainer.appendChild(img.cloneNode(true));  // Clone and add images again
});

// Set the initial scroll speed and direction
let scrollSpeed = 1; // Adjust the speed of scroll (higher = slower)
let direction = 1; // 1 for left to right, -1 for right to left

// Function to move images
function moveImages() {
    // Move the images by scroll speed and direction
    gurusContainer.scrollLeft += scrollSpeed * direction;

    // Check if the images reached the end (scroll position is at the farthest right)
    if (gurusContainer.scrollLeft >= gurusContainer.scrollWidth / 2) {
        // Speed up the scroll back and reverse the direction
        direction = -1; // Change direction to right to left
        scrollSpeed = 2; // Speed up the scroll back
    }

    // Check if the images reached the start (scroll position is at the farthest left)
    if (gurusContainer.scrollLeft <= 0) {
        // Speed up the scroll forward and reverse the direction
        direction = 1; // Change direction to left to right
        scrollSpeed = 1; // Reset to normal speed
    }

    // Request the next frame for smooth continuous scrolling
    requestAnimationFrame(moveImages);
}

// Start the animation loop
requestAnimationFrame(moveImages);


