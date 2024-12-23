function initializeChart(canvasId) {
    const ctx = document.getElementById(canvasId).getContext('2d');

    // Create linear gradient for the background
    const gradientBackground = ctx.createLinearGradient(0, 0, 0, 400);
    gradientBackground.addColorStop(0, 'rgba(186, 190, 253, 1)'); // Start color
    gradientBackground.addColorStop(1, 'rgba(66, 71, 158, 1)'); // End color

    // Create linear gradient for the border color (if you want a gradient border)
    const gradientBorder = ctx.createLinearGradient(0, 0, 0, 400);
    gradientBorder.addColorStop(0, 'rgb(139, 164, 245)'); // Start color
    gradientBorder.addColorStop(1, 'rgb(76, 91, 203)'); // End color

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['1', '2', '3', '4', '5', '6'],
            datasets: [{
                label: 'Balance',
                data: [99630, 99700, 99500, 99800, 100000, 100080],
                borderColor: gradientBorder, // Apply gradient to the border
                backgroundColor: gradientBackground, // Apply gradient to the background
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Number of Trades',
                        color: '#fff'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Balance',
                        color: '#fff'
                    }
                }
            }
        }
    });
}

// Function to handle screen size and initialize the appropriate chart
function handleScreenSize() {
    const isSmallScreen = window.innerWidth <= 768;
    const largeCanvas = document.getElementById('myLargeChart');
    const smallCanvas = document.getElementById('mySmallChart');

    if (isSmallScreen) {
        // On small screen, show small canvas and hide large canvas
        largeCanvas.style.display = 'none';
        smallCanvas.style.display = 'block';
        // Initialize the small screen chart
        initializeChart('mySmallChart');
    } else {
        // On large screen, show large canvas and hide small canvas
        largeCanvas.style.display = 'block';
        smallCanvas.style.display = 'none';
        // Initialize the large screen chart
        initializeChart('myLargeChart');
    }
}

// Call on window resize and on page load to initialize the chart
window.addEventListener('resize', handleScreenSize);
window.addEventListener('load', handleScreenSize);








// TODAYS PAYOUTS 
const cardAmountElement = document.getElementById('cardAmount');
    const keyName = 'lastPayoutData';

    // Generate a random amount between 200 and 1020
    function generateRandomAmount() {
        return Math.floor(Math.random() * (1020 - 200 + 1)) + 200;
    }

    // Reset the amount at midnight
    function resetAtMidnight() {
        const now = new Date();
        const millisTillMidnight =
            new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0) - now;

        setTimeout(() => {
            localStorage.removeItem(keyName);
            cardAmountElement.textContent = "$0.00";
            resetAtMidnight(); // Schedule the next reset
        }, millisTillMidnight);
    }

    // Update the card amount every 5 seconds
    function updateCardAmount() {
        let currentAmount = parseFloat(cardAmountElement.textContent.replace(/[^0-9.-]+/g, '')) || 0;
        const increment = generateRandomAmount();
        const newAmount = currentAmount + increment;

        cardAmountElement.textContent = `$${newAmount.toFixed(2)}`;

        // Save the amount to localStorage
        const payoutData = {
            amount: newAmount,
            date: new Date().toISOString().split('T')[0], // Only save the date part
        };
        localStorage.setItem(keyName, JSON.stringify(payoutData));
    }

    // Check if there is data saved for today
    function initializeAmount() {
        const savedData = JSON.parse(localStorage.getItem(keyName));
        const today = new Date().toISOString().split('T')[0];

        if (savedData && savedData.date === today) {
            // Use the saved amount if it's from today
            cardAmountElement.textContent = `$${savedData.amount.toFixed(2)}`;
        } else {
            // Reset the amount for a new day
            cardAmountElement.textContent = "$0.00";
            localStorage.removeItem(keyName);
        }
    }

    // Start the process
    initializeAmount();
    resetAtMidnight();
    setInterval(updateCardAmount,  21600000); // Update every 5 seconds