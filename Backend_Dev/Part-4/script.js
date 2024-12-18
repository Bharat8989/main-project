const express = require('express');

const app = express();

// Middleware 1
app.use(function (req, res, next) {
    console.log('Middleware executed');
    next();
});

// Middleware 2
app.use(function (req, res, next) {
    console.log('Middleware executed again');
    next();
});

// Route: Home
app.get('/', function (req, res) {
    res.send('Champion mera pavan');
});

// Route: About
app.get('/about', function (req, res) {
    res.send('About page loading');
});

// Route: Photo (simulating an error)
app.get('/photo', function (req, res, next) {
    next(new Error('Something went wrong'));
});

// Error-handling middleware
app.use(function (err, req, res, next) {
    console.error(err.stack); // Corrected typo here
    res.status(500).send("Something went wrong, we don't have any idea");
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
