const express = require('express');
const app=express();

const userModel=require('./models/user');   
const dbConnection=require('./config/db');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); 

app.set('view engine', 'ejs');  


app.get('/', (req, res) => {    
    res.render('index');
});
app.get('/register', (req, res) => {    
    res.render('register');
});
app.post('/register', async(req,res)=>{
    // res.render('register');
    // console.log(req.body);
    const {username,email,password}=req.body;
   await userModel.create({
        username:username,
        email:email,
        password:password
    }); 
    res.send('user registered');
});


// app.get('/get-users',(req,res)=>{
//     userModel.find().then((users)=>{
//         res.send(users);
        
//     })
// });


app.get('/about', (req, res) => {    
    res.send('about'); 
});
app.get('/profile', (req, res) => {
  res.send('This is the profile page');
});
app.post('/get-form-data', (req, res) => {    
    console.log(req.body);
    res.send('data received');
});

app.listen(3000, () => {    
    console.log('Server is running on port 3000');
} );


//1.44
