// HAMBURGER
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const menu = document.querySelector(".hold3");
    const foldIcon = hamburger.querySelector("i:nth-child(1)");
    const unfoldIcon = document.querySelector(".hold3 .hamburger i");
  
    // Toggle menu on hamburger click
    hamburger.addEventListener("click", () => {
      menu.classList.toggle("open");
  
      // Toggle the visibility of the icons (show fold/unfold)
      if (menu.classList.contains("open")) {
        foldIcon.style.display = "none";
        unfoldIcon.style.display = "block"; // Show unfold icon when menu is open
      } else {
        foldIcon.style.display = "block";
        unfoldIcon.style.display = "none"; // Show fold icon when menu is closed
      }
    });
  
    // Close the menu when the unfold icon is clicked
    unfoldIcon.addEventListener("click", () => {
      menu.classList.remove("open");
      foldIcon.style.display = "block";
      unfoldIcon.style.display = "none";
    });
  });
  
  
  
  
  
  // MONTHLY AND WEEKLY TOGGLE 

  document.getElementById("checkbox").addEventListener("change", function() {
    // Monthly to Weekly Price Change for Basic
    if (this.checked) {
      document.getElementById("basic").innerText = "$50.99"; // Weekly Price
      document.getElementById("professional").innerText = "$100.99"; // Weekly Price
      document.getElementById("master").innerText = "$300.99"; // Weekly Price
    } else {
      document.getElementById("basic").innerText = "$100.99"; // Monthly Price
      document.getElementById("professional").innerText = "$400.99"; // Monthly Price
      document.getElementById("master").innerText = "$900.99"; // Monthly Price
    }
  });
  

  
  
  
  // PAYMENT COUNT 
  // COUNT NUMBER ANIMATION
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".price__card h3").forEach((card) => {
    const target = +card.textContent.replace(/\D/g, ""); // Extract number from text
    let current = 1;
    const interval = setInterval(() => {
      card.textContent = `$${current.toLocaleString()}`; // Update the card text with formatted number
      if (current >= target) clearInterval(interval); // Stop when target is reached
      current++; // Increment number
    }, 5); // Speed of counting (in milliseconds)
  });
});

  
  
  
  // PRICING PLAN 
  document.addEventListener("DOMContentLoaded", () => {
    const cardsContainer = document.querySelector(".cards");
    const activeCard = document.querySelector(".card.active");
  
    // Center the active card
    const centerActiveCard = () => {
      const containerWidth = cardsContainer.offsetWidth;
      const cardWidth = activeCard.offsetWidth;
      const scrollLeft = activeCard.offsetLeft - (containerWidth / 2 - cardWidth / 2);
  
      cardsContainer.scrollTo({
        left: scrollLeft,
        behavior: "smooth"
      });
    };
  
    centerActiveCard();
  
    // Optional: Scroll on card click to make it active
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      card.addEventListener("click", () => {
        // Remove active class from other cards
        cards.forEach((c) => c.classList.remove("active"));
        // Add active class to the clicked card
        card.classList.add("active");
        centerActiveCard();
      });
    });
  });
  
  
  
  
  // SCROLL TOP 
  // Wait for the DOM to be ready
  document.addEventListener("DOMContentLoaded", () => {
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  
    // Show the button when scrolling down, hide when at the top
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {  // When the user scrolls down 200px
        scrollToTopBtn.classList.add("show");
      } else {
        scrollToTopBtn.classList.remove("show");
      }
    });
  
    // Scroll to the top of the page when the button is clicked
    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth" // Smooth scrolling
      });
    });
  });
  
  
  
  
  
  
  // MEMBER REVIEW 
  document.addEventListener("DOMContentLoaded", () => {
    const leftArrow = document.querySelector(".left-arrow");
    const rightArrow = document.querySelector(".right-arrow");
    const reviewText = document.querySelector(".review-text");
    const memberName = document.querySelector(".member-name");
    const memberProfession = document.querySelector(".member-profession");
    const memberImage = document.querySelector(".review__member__image");
    const reviewRating = document.querySelector(".review__rating"); // Select the stars container
    
    // Reviews array with text, member details, image, and rating
    const reviews = [
      {
        text: "What truly sets this Forex prop firm apart is its expert team of trading analysts and support staff. The team is knowledgeable, approachable, and genuinely invested in helping members achieve their trading goals.",
        member: {
          name: "Jane Cooper",
          profession: "Stock Trader",
          image: "/images/profile.jpeg"
        },
        rating: 2 // Rating for this review
      },
      {
        text: "I've been with this prop firm for 6 months now, and the experience has been incredible! The mentorship is top-notch, and the trading tools provided have helped me improve my trading skills significantly.",
        member: {
          name: "John Doe",
          profession: "Gold Trader",
          image: "/images/profile.jpeg"
        },
        rating: 4.5 // Rating for this review
      },
      {
        text: "The customer support is amazing! They're always available to answer my questions, and they genuinely care about my success as a trader. Highly recommend this firm to anyone looking to start their trading journey!.",
        member: {
          name: "Sarah Lee",
          profession: "Crypto Trader",
          image: "/images/profile.jpeg"
        },
        rating: 2 // Rating for this review
      }
    ];
  
    let currentReviewIndex = 0;
  
    // Function to generate stars based on rating
    const generateStars = (rating) => {
      const fullStars = Math.floor(rating); // Full stars
      const halfStars = rating % 1 !== 0 ? 1 : 0; // Half star if there's a remainder
      const emptyStars = 5 - fullStars - halfStars; // Remaining empty stars
  
      // Clear existing stars
      reviewRating.innerHTML = "";
  
      // Add full stars
      for (let i = 0; i < fullStars; i++) {
        reviewRating.innerHTML += '<span><i class="ri-star-fill"></i></span>';
      }
  
      // Add half star if needed
      if (halfStars === 1) {
        reviewRating.innerHTML += '<span><i class="ri-star-half-fill"></i></span>';
      }
  
      // Add empty stars
      for (let i = 0; i < emptyStars; i++) {
        reviewRating.innerHTML += '<span><i class="ri-star-line"></i></span>';
      }
    };
  
    // Function to update the review content
    const updateReview = () => {
      reviewText.innerText = reviews[currentReviewIndex].text;
      memberName.innerText = reviews[currentReviewIndex].member.name;
      memberProfession.innerText = reviews[currentReviewIndex].member.profession;
      memberImage.src = reviews[currentReviewIndex].member.image;
      generateStars(reviews[currentReviewIndex].rating); // Update stars based on the rating
    };
  
    // Initialize with the first review
    updateReview();
  
    // Event listener for left arrow
    leftArrow.addEventListener("click", () => {
      currentReviewIndex = (currentReviewIndex === 0) ? reviews.length - 1 : currentReviewIndex - 1;
      updateReview();
    });
  
    // Event listener for right arrow
    rightArrow.addEventListener("click", () => {
      currentReviewIndex = (currentReviewIndex === reviews.length - 1) ? 0 : currentReviewIndex + 1;
      updateReview();
    });
  });
  