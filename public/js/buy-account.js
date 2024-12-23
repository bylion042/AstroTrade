// TWO BUTTONS FOR INFO 
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".info-btn");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("data-target");
      const targetContent = document.getElementById(targetId);

      // Toggle active state
      targetContent.classList.toggle("active");

      // Close other details
      document.querySelectorAll(".details-content").forEach(content => {
        if (content !== targetContent) {
          content.classList.remove("active");
        }
      });
    });
  });
});




// READ MORE SCROLL 
document.addEventListener("DOMContentLoaded", () => {
  const scrollContainer = document.querySelector(".scroll-container");
  const progressBar = document.querySelector(".progress-bar");

  // Update progress bar on scroll
  scrollContainer.addEventListener("scroll", () => {
    const scrollWidth = scrollContainer.scrollWidth - scrollContainer.clientWidth;
    const scrollLeft = scrollContainer.scrollLeft;
    const scrollPercentage = (scrollLeft / scrollWidth) * 100;
    progressBar.style.width = `${scrollPercentage}%`;
  });
});






// PASS TO ACCESS PASS PAGE 
  // Select all price cards
  const priceCards = document.querySelectorAll('.price__card');

  // Loop through each card and add an event listener to its form
  priceCards.forEach(card => {
    const form = card.querySelector('form');
    const feeText = card.querySelector('p'); // Assuming fee text is the first <p> inside the card
    const feeValue = feeText ? feeText.innerText.replace('Fee', '').trim() : '';

    form.addEventListener('submit', function(event) {
      // Set the hidden input field with the fee value when the form is submitted
      const hiddenInput = form.querySelector('input[name="htmlContent"]');
      hiddenInput.value = feeValue;
      
      // Log to check that the correct fee value is passed
      console.log('Setting Fee:', feeValue);
    });
  }); 






