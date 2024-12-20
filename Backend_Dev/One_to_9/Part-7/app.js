const express = require('express');
const path = require('path'); // Import the 'path' module
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.get('/', function (req, res) {
    // res.send("Welcome to the Express app!"); // Improved welcome message
    res.render("index");
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
