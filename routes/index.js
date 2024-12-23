const express = require('express');
const router = express.Router();

// Use the auth routes for sign-up and sign-in logic
const authRoutes = require('./auth');
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

// EXNESS Route (GET)
router.get('/exness', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/auth/signin'); // Redirect to sign-in if not logged in
    }
    res.render('exness', { 
        title: 'exness', 
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

// Buy account route 
router.get('/buy-account', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/auth/signin'); 
    }
    res.render('buy-account', { 
        title: 'buy-account', 
        user: req.session.user // Pass user to the view
    });
});


//READ MORE route 
router.get('/read-more', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/auth/signin'); 
    }
    res.render('read-more', { 
        title: 'read-more', 
        user: req.session.user // Pass user to the view
    });
});


// TOURNAMENT ROUTE 
router.get('/tournament', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/auth/signin'); 
    }
    res.render('tournament', { 
        title: 'tournament', 
        user: req.session.user // Pass user to the view
    });
});



// smart investment Pass ROUTE 
router.get('/smart-invest', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/auth/signin'); 
    }
    res.render('smart-invest', { 
        title: 'smart-invest', 
        user: req.session.user // Pass user to the view
    });
});


// Access Pass ROUTE 
// Route to serve the access-pass page
router.get('/access-pass', (req, res) => {
    if (!req.session.user) {
      return res.redirect('/auth/signin');  // Redirect to sign-in page if user is not authenticated
    }
  
    res.render('access-pass', {
      title: 'Access Pass',
      user: req.session.user // Pass user info to the view
    });
  });
  
  // Route to handle form submission (POST request)
  router.post('/access-pass', (req, res) => {
    if (!req.session.user) {
      return res.redirect('/auth/signin'); // Redirect to sign-in page if user is not authenticated
    }
  
    // Extract the fee (htmlContent) from the form submission
    const htmlContent = req.body.htmlContent; 
    console.log('Form submitted content:', htmlContent); // Debugging line to see what was submitted
  
    res.render('access-pass', { 
      title: 'Access Pass', 
      user: req.session.user, // Pass user info to the view
      htmlContent // Pass the fee value to the view
    });
  });


// payment Pass ROUTE 
router.get('/payment', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/auth/signin');
    }
    // Get the price from the query string
    const price = req.query.htmlContent;
    // Pass the price to the view
    res.render('payment', { 
        title: 'Payment', 
        user: req.session.user, 
        price: price // Pass the price value to the payment page
    });
});


// PASS ROUTE 
// Assuming you are using Express.js
router.get('/pass', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/auth/signin'); 
    }
    res.render('pass', { 
        title: 'Pass Page', 
        user: req.session.user // Pass user to the view
    });
});

router.post('/pass', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/auth/signin'); 
    }

    const htmlContent = req.body.htmlContent; // Extract from form submission
    console.log('Form submitted content:', htmlContent); // Debugging line

    res.render('pass', { 
        title: 'Pass Page', 
        user: req.session.user, // Pass user info
        htmlContent // Pass the fee data to the template
    });
});








module.exports = router;
