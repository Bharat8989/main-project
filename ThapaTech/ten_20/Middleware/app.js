// const http=require('http');
// const server=http.createServer(function(req,res){
//     res.end('hello world');
// })
// server.listen(3000);

// routing 

// const express=require('express')
// const app=express();
// app.get('/',function(req,res){
//     res.send('what is your name');
// });
// app.get('/name',function(req,res){
//     res.send("my name is Pavan");
// });
// app.listen(3000);


const express = require('express');
const app = express();


app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index', { title: 'Home Page', message: 'Welcome to EJS!' });
});


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});





// console.log(__filename)
// const express=require('express')
// const app=express();
// const path=require('path');

// app.use(express.json());
// app.use((express.urlencoded({extended:true})));
// app.use(express.static(path.join(__dirname,'public')));

