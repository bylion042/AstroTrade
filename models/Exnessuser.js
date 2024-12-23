const mongoose = require('mongoose');

const exnessUserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true, // Make sure email is unique
    },
    password: {
        type: String,
        required: true, // Ensure password is provided
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Exnessuser', exnessUserSchema);
