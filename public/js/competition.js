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





// TIME FUNCTIONALITY 
// UPCOMING, FINISHED, PENDING
function updateCountdown(endDate, elementId, statusElementId) {
    const countdownElement = document.getElementById(elementId);
    const statusElement = document.getElementById(statusElementId);
    const endTime = new Date(endDate).getTime();

    function updateTimer() {
        const now = new Date().getTime();
        const timeLeft = endTime - now;

        if (timeLeft <= 0) {
            countdownElement.innerHTML = "The competition has started!";
            statusElement.innerHTML = "In Progress"; // Change status to 'In Progress'
            statusElement.classList.remove('upcoming');
            statusElement.classList.add('in-progress');
            clearInterval(timer);
        } else {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            countdownElement.innerHTML = `${days} Days ${hours} Hours ${minutes} Min ${seconds} Sec`;
        }

        // Check if the competition has ended and update status to 'Finished'
        if (now >= endTime) {
            statusElement.innerHTML = "Finished"; // Change status to 'Finished'
            statusElement.classList.remove('in-progress');
            statusElement.classList.add('finished');
        }
    }

    updateTimer(); // Initial call
    const timer = setInterval(updateTimer, 1000); // Update every second
}

// Initialize countdown timers and update competition statuses
updateCountdown('2025-01-01T00:00:00', 'countdown1', 'status1');
updateCountdown('2024-12-01T00:00:00', 'countdown2', 'status2');
updateCountdown('2024-11-01T00:00:00', 'countdown3', 'status3');
updateCountdown('2025-02-01T00:00:00', 'countdown4', 'status4');
updateCountdown('2025-03-01T00:00:00', 'countdown5', 'status5');
updateCountdown('2025-04-01T00:00:00', 'countdown6', 'status6');






/* ENROLL MESSAGE  */
// Handle enrollment submission
// Show the email input popup
function showEmailPopup() {
    document.getElementById('emailModal').style.display = 'flex';
}

// Handle enrollment submission
function submitEnrollment() {
    const emailInput = document.getElementById('emailInput');
    const email = emailInput.value;

    // Basic email validation using regex
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailPattern.test(email)) {
        // Email is valid, proceed to confirmation
        document.getElementById('emailModal').style.display = 'none';
        document.getElementById('confirmationModal').style.display = 'flex';
    } else {
        // Email is invalid, show an error
        alert('Please enter a valid email address.');
        emailInput.focus();
    }
}

// Close any modal
function closeModal() {
    document.getElementById('emailModal').style.display = 'none';
    document.getElementById('confirmationModal').style.display = 'none';
}

