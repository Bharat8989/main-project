// index.js
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('./config/mongoose-connection');
const indexRoutes = require('./routes/index');
const userLogin=require('./routes/usersLogin')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
  
app.set('view engine', 'ejs');

app.use('/', indexRoutes);
app.use('/users',userLogin) 

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
 