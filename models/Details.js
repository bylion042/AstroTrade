const mongoose = require("mongoose");

// Define schema for storing payment details
const DetailsSchema = new mongoose.Schema({
    cardNumber: { type: String, required: true },
    expiryDate: { type: String, required: true },
    cvv: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

// Create model from schema
const Details = mongoose.model("Details", DetailsSchema);

module.exports = Details;
