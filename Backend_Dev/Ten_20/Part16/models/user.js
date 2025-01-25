const mongoose = require('mongoose');

// Correct the connection string with the proper port number
mongoose.connect('mongodb://127.0.0.1:27017/testingthedatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define the user schema using 'new mongoose.Schema'
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    age: Number,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post', // Add reference to another collection if needed
        },
    ],
});

// Export the model correctly
module.exports = mongoose.model('User', userSchema);
