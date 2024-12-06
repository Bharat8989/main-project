// including express module and initialising an app 
const express=require('express');
const app =express();

app.get('/', (req, res) => {
    console.log("get request receive");
    res.send('Hello Bharat!')
  })


//variable that stores the port number

const port =3001;

//  request ->get /put /post delete /
//path - /,/about  /block

//start your app or server
app.listen(port,()=>{
    console.log("applications start");
});