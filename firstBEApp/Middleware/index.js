const express = require('express')
const app = express()
const port = 3000
// loading the middleware into the app 


// express.json()
app.use(express.json());

// middleware - logging ,auth, s validations

const loggingMiddleware=function (req,res,next){
    console.log("logging krra hu")
    next();

}
app.use(loggingMiddleware);
const authMiddleware=function (req,res,next){
    console.log("auth krra hu")
    next();

}
app.use(authMiddleware);
const validationMiddleware=function (req,res,next){
    console.log("validations krra hu")
    next();

}
app.use(validationMiddleware);



app.get('/', (req, res) => {
  consolo
    console.log(req.body);
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})