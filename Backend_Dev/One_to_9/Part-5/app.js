// express js ek npm package ahe
//framework 
//manages everything from receiving the request and giving the response


// const express = require('express')
// const app = express()

// app.get('/', function (req, res) {
//   res.send('Hello World')
// })

// const express=require('express');
// const app=express();


// app.get('/',function(req,res){
//     res.send('hello ,suraj and manisha ');
// })

// app.get('/Hello',function(req,res){
//     res.send('hello ,Pavan and Pooja');
// });




const express=require('express')
const app=express();
app.get('/',function(req,res){
    res.send('what is your name');
});
app.get('/photo',function(req,res){
    res.send("my name is Pavan");
});
app.listen(3000);




