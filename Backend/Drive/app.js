// 1️⃣ LOAD ENV FIRST (MOST IMPORTANT)
require('dotenv').config();

// 2️⃣ IMPORT PACKAGES
const express = require('express');
const userRoutes = require('./routes/user.routes');
const connectDB = require('./config/db');

// 3️⃣ CONNECT DATABASE
connectDB();

const app = express();

// 4️⃣ MIDDLEWARES
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true })); // parse form data
app.use(express.json());

// 5️⃣ ROUTES
app.use('/user', userRoutes);

app.get('/', (req, res) => {
  res.render('index');
});

// 6️⃣ SERVER
app.listen(3000, () => {
  console.log('Server is running on Port 3000');
});
