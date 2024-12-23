 // PASS TO pay PAGE 
 document.addEventListener("DOMContentLoaded", function () {
  const priceCards = document.querySelectorAll('.price__card');

  priceCards.forEach(card => {
    const dataContent = JSON.parse(card.getAttribute('data-content')); // Parse the data-content
    const feeValue = dataContent.fee; // Get the fee value from data-content

    // Update the fee text in the card (with $ sign)
    const feeText = card.querySelector('.price__card__content p');  // Select the first <p> under content
    feeText.textContent = `Fee $${feeValue}`; // Set the fee text with the dollar sign

    // Update the hidden input field with the correct fee value (no $ sign)
    const hiddenFeeInput = card.querySelector('input[name="fee"]');
    if (hiddenFeeInput) {
      hiddenFeeInput.value = feeValue; // Set the fee value (numeric) in the hidden input field
    }
  });
});

// Function to update form data with the fee when the button is clicked
function updateFormData(button) {
  const card = button.closest('.price__card'); // Find the parent price card
  const dataContent = JSON.parse(card.getAttribute('data-content')); // Parse the data-content to get fee
  const feeValue = dataContent.fee; // Get the fee value (numeric)

  // Find the hidden fee input and update its value
  const hiddenFeeInput = card.querySelector('input[name="fee"]');
  if (hiddenFeeInput) {
    hiddenFeeInput.value = feeValue; // Set the fee value (numeric) in the hidden input
  }
}

