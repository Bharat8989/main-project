import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// To simulate __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Setting the view engine
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
    res.render('index'); // Render the EJS template `index.ejs`
});

// Dynamic routing
app.get('/profile/:username', (req, res) => {
    res.send(`Welcome, ${req.params.username}`);
});

app.get('/profile/:username/:age', (req, res) => {
    res.send(`Welcome, ${req.params.username} of age ${req.params.age}`);
});

// Starting the server
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
