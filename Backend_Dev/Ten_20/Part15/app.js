const express =require('express')
const app=express();

app.get('/',(req,res)=>{
    res.send('welcome')

});
// app.get('/', function(req,res){
//     res.send('welcome')
// })
app.listen(3000);
