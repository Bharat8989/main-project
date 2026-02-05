const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        minLength: 3,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    contact: {
        type: Number,
        required: false,
    },
    picture: {
        type: String,
        default: '',
    },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
