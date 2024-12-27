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






// BECOME A MANGER 
document.getElementById('toggleButton').addEventListener('click', function() {
  // Toggle visibility of profile picture upload form
  document.getElementById('profilePicSection').classList.toggle('hidden');
});

document.getElementById('profilePic').addEventListener('change', function(event) {
  const file = event.target.files[0];
  const previewImage = document.getElementById('previewImage');
  
  if (file) {
      // Create a URL for the selected image file
      const imageURL = URL.createObjectURL(file);
      
      // Show the preview section and update the image
      document.getElementById('imagePreview').classList.remove('hidden');
      previewImage.src = imageURL;
  } else {
      // If no file is selected, hide the preview
      document.getElementById('imagePreview').classList.add('hidden');
  }
});

document.getElementById('submitPic').addEventListener('click', function() {
  // Check if a file is selected (you can add more validation if needed)
  const profilePic = document.getElementById('profilePic').files[0];
  
  if (profilePic) {
      // Hide the profile pic upload section and show the success message
      document.getElementById('profilePicSection').classList.add('hidden');
      document.getElementById('successMessage').classList.remove('hidden');
  } else {
      alert('Please upload a profile picture.');
  }
});
