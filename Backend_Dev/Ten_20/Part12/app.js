const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const userModel = require('./module/user');

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/testapp1", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/read', async (req, res) => {
  try {
    const users = await userModel.find();
    res.render('read', { users });
  } catch (err) {
    res.status(500).send("Error fetching users");
  }
});

app.get('/edit/:id', async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) return res.status(404).send("User not found");
    res.render('edit', { user });
  } catch (err) {
    res.status(500).send("Error fetching user");
  }
});

app.post('/update/:id', async (req, res) => {
  try {
    const { name, email, image } = req.body;
    await userModel.findByIdAndUpdate(req.params.id, { name, email, image });
    res.redirect('/read');
  } catch (err) {
    res.status(500).send("Error updating user");
  }
});

app.get('/delete/:id', async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    res.redirect('/read');
  } catch (err) {
    res.status(500).send("Error deleting user");
  }
});

app.post('/create', async (req, res) => {
  try {
    const { name, email, image } = req.body;
    await userModel.create({ name, email, image });
    res.redirect('/read');
  } catch (err) {
    res.status(500).send("Error creating user");
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
