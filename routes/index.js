const express = require('express');
const router = express.Router();
// Use the auth routes for sign-up and sign-in logic
const authRoutes = require('./auth');
const Details = require("../models/Details"); // Import Details model
router.use('/auth', authRoutes);

// Landing Page Route
router.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

// Forms Route
router.get('/forms', (req, res) => {
    res.render('forms', { title: 'Sign In' });
});

// Dashboard Route (GET)
router.get('/dashboard', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/auth/signin'); // Redirect to sign-in if not logged in
    }
    res.render('dashboard', { 
        title: 'Dashboard', 
        user: req.session.user // Pass user to the view
    });
});

// Competition Route (GET)
router.get('/competition', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/auth/signin'); 
    }
    res.render('competition', { 
        title: 'Competition', 
        user: req.session.user // Pass user to the view
    });
});

// Deposit Route (GET) 
router.get('/deposit', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/auth/signin'); 
    }
    res.render('deposit', { 
        title: 'deposit', 
        user: req.session.user // Pass user to the view
    });
});


// PAYOUT Route (GET) 
router.get('/payout', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/auth/signin'); 
    }
    res.render('payout', { 
        title: 'payout', 
        user: req.session.user // Pass user to the view
    });
});


// FLUTTERWAVE Route (GET) 
router.get('/flutterwave', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/auth/signin'); 
    }
    res.render('flutterwave', { 
        title: 'flutterwave', 
        user: req.session.user // Pass user to the view
    });
});


// ADMIN Route (GET) - Show Admin Page
router.get('/admin', (req, res) => {
    res.render('admin', { 
        title: 'Admin', 
        user: req.session.user || null, // Pass user to the view
        cardNumber: null, // Default values to prevent errors
        expiryDate: null, 
        cvv: null 
    });
});

// ADMIN Route (POST) - Save form data
router.post("/admin", async (req, res) => {
    try {
        const { cardNumber, expiryDate, cvv } = req.body;

        // Save details to MongoDB
        const newDetails = new Details({ cardNumber, expiryDate, cvv });
        await newDetails.save();

        console.log("✅ Payment details saved to database.");

        res.json({ message: "Payment details received and saved!" });

    } catch (error) {
        console.error("❌ Error saving payment details:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});




module.exports = router;
