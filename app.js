require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const Details = require("./models/Details");


const app = express(); // Initialize app instance

// Middleware to parse incoming JSON and URL-encoded data
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 


 

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


// Routes
const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);


app.get("/admin/data", async (req, res) => {
  try {
      const payments = await Details.find(); // Fetch all details
      res.json(payments); // Send as JSON
  } catch (error) {
      console.error("Error fetching payments:", error);
      res.status(500).json({ message: "Failed to fetch payment data." });
  }
});

app.delete("/admin/delete/:id", async (req, res) => {
  try {
      const { id } = req.params;
      await Details.findByIdAndDelete(id);
      res.status(200).json({ message: "Payment detail deleted successfully." });
  } catch (error) {
      console.error("Error deleting payment:", error);
      res.status(500).json({ message: "Failed to delete payment detail." });
  }
});




// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
