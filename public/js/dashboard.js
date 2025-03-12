// Get all the menu items
const menuItems = document.querySelectorAll('.menu a');

// Function to set the active menu item based on the current URL
function setActiveMenuItem() {
    // Get the current URL path
    const currentPath = window.location.pathname;

    // Loop through each menu item
    menuItems.forEach(item => {
        // Remove 'active' class from all menu items
        item.classList.remove('active');

        // Check if the item's href matches the current path
        if (item.getAttribute('href') === currentPath) {
            item.classList.add('active');
        }
    });
}

// Run the function on page load
setActiveMenuItem();




// close sidebar and open sidebar 
const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('toggle-btn');
const container = document.querySelector('.container');

toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('closed');
    container.classList.toggle('sidebar-closed');

    // Change the icon direction
    const icon = toggleBtn.querySelector('i');
    if (sidebar.classList.contains('closed')) {
        // Change to right arrow when sidebar is closed
        icon.classList.remove('fa-angle-left');
        icon.classList.add('fa-angle-right');
    } else {
        // Change to left arrow when sidebar is open
        icon.classList.remove('fa-angle-right');
        icon.classList.add('fa-angle-left');
    }
});



// SWEET TOAST 
document.querySelectorAll(".buyAccount").forEach((element) => {
    element.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent default link behavior

        Swal.fire({
            title: "Access Denied!",
            text: "You are not yet an admin. Deposit $0.5 to have full access.",
            icon: "warning",
            confirmButtonText: "Okay",
            confirmButtonColor: "#696fdd",
            width: "400px",
            didOpen: () => {
                document.querySelector(".swal2-title").style.fontSize = "16px";
                document.querySelector(".swal2-title").style.lineHeight = "1.4";
                document.querySelector(".swal2-html-container").style.fontSize = "14px";
                document.querySelector(".swal2-html-container").style.lineHeight = "1.5";
                document.querySelector(".swal2-confirm").style.fontSize = "13px";
                document.querySelector(".swal2-confirm").style.padding = "8px 16px";
            }
        }).then(() => {
            Swal.fire({
                title: "Start Trading for People!",
                text: "Pay only $0.5 as an access fee (no hidden fees, prove you're not a bot). Complete your deposit to gain full access.",
                icon: "success",
                confirmButtonText: "Deposit Now",
                showCancelButton: true,
                cancelButtonText: "Cancel",
                confirmButtonColor: "#28a745",
                cancelButtonColor: "#d33",
                width: "400px",
                didOpen: () => {
                    document.querySelector(".swal2-title").style.fontSize = "16px";
                    document.querySelector(".swal2-title").style.lineHeight = "1.4";
                    document.querySelector(".swal2-html-container").style.fontSize = "14px";
                    document.querySelector(".swal2-html-container").style.lineHeight = "1.5";
                    document.querySelector(".swal2-confirm").style.fontSize = "13px";
                    document.querySelector(".swal2-confirm").style.padding = "8px 16px";
                    document.querySelector(".swal2-cancel").style.fontSize = "13px";
                    document.querySelector(".swal2-cancel").style.padding = "8px 16px";
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "/deposit";  
                }
            });
        });
    });
});





// HAMBURGER 
document.addEventListener("DOMContentLoaded", function() {
    const hamburgerMenu = document.getElementById("hamburger-menu");
    const menuContainer = document.getElementById("menu-container");
    const openIcon = document.getElementById("open-menu");
    const closeIcon = document.getElementById("close-menu");

    // Toggle menu visibility
    hamburgerMenu.addEventListener("click", function() {
        menuContainer.classList.toggle("active");

        // Toggle hamburger icons
        if (menuContainer.classList.contains("active")) {
            openIcon.style.display = "none";
            closeIcon.style.display = "block";
        } else {
            openIcon.style.display = "block";
            closeIcon.style.display = "none";
        }
    });
});


// HAMBURGER EASE IN EASE OUT 
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerContainer = document.getElementById('hamburger-container');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY) {
            // Scrolling down - hide the hamburger
            hamburgerContainer.classList.add('hidden');
            hamburgerContainer.classList.remove('visible');
        } else {
            // Scrolling up - show the hamburger
            hamburgerContainer.classList.add('visible');
            hamburgerContainer.classList.remove('hidden');
        }

        lastScrollY = currentScrollY;
    });
});





// DRAGABLE IMAGE 
document.addEventListener('DOMContentLoaded', () => {
    const draggable = document.querySelector('.draggable-image');
    const closeButton = document.querySelector('.close-btn');
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    // Common function to start dragging
    const startDrag = (e) => {
        isDragging = true;
        draggable.style.cursor = 'grabbing';

        const rect = draggable.getBoundingClientRect();

        // Calculate offsets for mouse or touch
        if (e.type === 'mousedown') {
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;
        } else if (e.type === 'touchstart') {
            offsetX = e.touches[0].clientX - rect.left;
            offsetY = e.touches[0].clientY - rect.top;
        }
    };

    // Common function to drag
    const onDrag = (e) => {
        if (!isDragging) return;

        // Get cursor or touch position
        let clientX, clientY;
        if (e.type === 'mousemove') {
            clientX = e.clientX;
            clientY = e.clientY;
        } else if (e.type === 'touchmove') {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        }

        // Update position of the draggable element
        draggable.style.left = `${clientX - offsetX}px`;
        draggable.style.top = `${clientY - offsetY}px`;
        draggable.style.right = 'auto'; // Prevent snapping back to right
        draggable.style.transform = 'none'; // Remove initial centering
    };

    // Common function to stop dragging
    const stopDrag = () => {
        isDragging = false;
        draggable.style.cursor = 'grab';
    };

    // Mouse events
    draggable.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('close-btn')) return; // Ignore drag on close button
        startDrag(e);
    });

    window.addEventListener('mousemove', onDrag);
    window.addEventListener('mouseup', stopDrag);

    // Touch events
    draggable.addEventListener('touchstart', (e) => {
        if (e.target.classList.contains('close-btn')) return; // Ignore drag on close button
        startDrag(e);
    });

    window.addEventListener('touchmove', onDrag);
    window.addEventListener('touchend', stopDrag);

    // Close functionality
    closeButton.addEventListener('click', () => {
        draggable.style.display = 'none'; // Hide the draggable container
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
  