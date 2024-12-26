const express = require('express');
const app = express();
const path = require('path');

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Middleware
app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies

// Serve static files
app.use(express.static(path.join(__dirname, 'public'))); // Corrected path.json to path.join

// Route
app.get('/', (req, res) => {
    res.render('index');
});
app.get('/read', (req, res) => {
    res.render('read');
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
 