// console.log(__dirname+'/public')
// const path=require('path');
// console.log(path.join(__dirname,'public'));


const express=require('express')
const app=express();
const path=require('path');

app.use(express.json());
app.use((express.urlencoded({extended:true})));
app.use(express.static(path.join(__dirname,'public')));


app.set('view engine','ejs');

app.get('/',function(req,res){
    res.render('index');
});

// dynamic routing
app.get('/profile/:username',function(req,res){
    // res.params.username
    // res.send('chai raha hai');
    res.send(`Welcome ,${req.params.username}`);
});

app.get('/profile/:username/:age',function(req,res){
    // res.params.username
    // res.send('chai raha hai');
    // res.send(req.params);
    res.send(`Welcome ,${req.params.username} of age ${req.params.age}`)
});

app.listen(3000,function(){
    console.log("its running");
})