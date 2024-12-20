const express = require('express');
const path = require('path'); // Import the 'path' module
const fs = require('fs'); // Import the 'fs' module
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
    // Read all files from the 'files' directory
    fs.readdir('./files', function (err, files) {
        if (err) {
            console.error(err);
            res.render('index', { files: [] }); // Render with an empty array in case of error
        } else {
            res.render('index', { files }); // Pass the file names to the template
        }
    });
});

app.post('/create', function (req, res) {
    // Ensure task title and details are provided
    const title = req.body.title || 'Untitled';
    const details = req.body.details || '';

    // Create the file with a sanitized title (remove spaces and join)
    const filename = `${title.split(' ').join('')}.txt`;
    fs.writeFile(`./files/${filename}`, details, function (err) {
        if (err) {
            console.error(err);
        }
        res.redirect('/'); // Redirect to the home page after file creation
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
