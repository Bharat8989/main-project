// const http =require('http');
// const server=http.createServer((req,res)=>{
//     res.end('hello world');
// });
// server.listen(3000,()=>{
//     console.log("server is live on port 3000");
// })


// var http = require('http');


// http.createServer(function (req, res) {

//     res.writeHead(200, { 'Content-Type': 'text/html' });


//     res.end('<h1>Hello Bhushan</h1>');
// }).listen(3000);
// console.log('Server is running on port 3000');
var http = require('http');
var dt = require('./myfirstmodule'); 

http.createServer(function (req, res) {
    res.writeHead(404, { 'Content-Type': 'text/html' });

    
    res.write("<h1>The date and time are currently:  </h1>" + dt.myDateTime() + "<br>" );

    
    res.write(dt.getGreeting('Bhushan'));
    res.write(req.url);
    
    res.end();
}).listen(8080, () => {
    console.log('Server is running on port 8080');
});
