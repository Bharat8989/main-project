const express=require('express')

const userModel=require('./models/user')
const postModel=require('./models/post')
const app=express();
app.get('/',function(req,res){
    res.send('hey');
    

})
app.get('/create', async function(req,res){
    // res.send('create it')
    let user =await userModel.create({
        username:'bharat',
        age:22,
        email:'kadamb204@gmail.com'
    });
})

app.listen(3000)