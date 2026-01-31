const express = require('express');
const app=express();

app.set('view engine', 'ejs');  
app.get('/', (req, res) => {    
    res.render('index');
});

app.get('/about', (req, res) => {    
    res.send('about'); 
});
app.get('/profile', (req, res) => {
  res.send('This is the profile page');
});

app.listen(3000, () => {    
    console.log('Server is running on port 3000');
} );