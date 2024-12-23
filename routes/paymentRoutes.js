const axios = require('axios');
const express = require('express');
const router = express.Router();

router.post('/payment', async (req, res) => {
    const { amount, currency, email, phone_number, name } = req.body;

    // Validate the amount to ensure it's a number and not undefined
    if (!amount || isNaN(amount) || amount <= 0) {
        return res.status(400).json({ error: 'Invalid payment amount. Please check the value.' });
    }

    // Prepare the payment request data
    const paymentData = {
        tx_ref: `txn_${Date.now()}`,  // Unique transaction reference
        amount: amount,
        currency: currency || 'NGN',  // Default to NGN if no currency is provided
        email: email,
        phone_number: phone_number,
        fullname: name,
        redirect_url: 'http://localhost:3000/api/payment-success', // Example success URL
        order_id: Date.now(), // Optional: You can track order_id if needed
    };

    try {
        const response = await axios.post('https://api.flutterwave.com/v3/charges?tx_ref=' + paymentData.tx_ref, paymentData, {
            headers: {
                Authorization: `Bearer YOUR_FLUTTERWAVE_SECRET_KEY`, // Add your Flutterwave secret key here
            },
        });

        if (response.data.status === 'success') {
            res.json({
                success: true,
                payment_url: response.data.data.link, // Flutterwave payment URL to redirect user
            });
        } else {
            res.status(500).json({ error: 'Payment initialization failed. Please try again.' });
        }
    } catch (error) {
        console.error('Error initiating payment:', error);
        res.status(500).json({ error: 'Payment initiation failed. Please try again.' });
    }
});

module.exports = router;
