// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');

// Initialize the Express application
const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect('mongodb://127.0.0.1:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Define the Mongoose schema and model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
});

const UserModel = mongoose.model('User', userSchema);

// Define routes
app.get('/', (req, res) => {
  res.send('Hey, welcome to the Express app!');
});

app.get('/create', async (req, res) => {
  try {
    const createdUser = await UserModel.create({
      name: 'Harsh',
      email: 'harsh@gmail.com',
      username: 'Bharat',
    });
    res.status(201).send(createdUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send({ message: 'Failed to create user', error: error.message });
  }
});

// Update user details
app.put('/update', async (req, res) => {
  const userId = req.params.id;
  const updateData = req.body;

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true });
    if (!updatedUser) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send({ message: 'Failed to update user', error: error.message });
  }
});

// Delete a user
app.delete('/delete', async (req, res) => {
  const userId = req.params.id;

  try {
    const deletedUser = await UserModel.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send({ message: 'User deleted successfully', user: deletedUser });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send({ message: 'Failed to delete user', error: error.message });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});
