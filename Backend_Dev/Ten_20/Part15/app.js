const express =require('express')
const app=express();

app.get('/',(req,res)=>{
    res.send('welcome hello somnath  hi how are you')
    

});
// app.get('/', function(req,res)
//     res.send('welcome')
// })
app.listen(3000);
 