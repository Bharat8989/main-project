// const fs= require('fs');

// // write files 

// fs.writeFile('hey.tex','hello , how can i help you',function(err){
//     if(err) console.error(err);
//         else console.log("done ");
// });
// // appendFiles

// fs.appendFile('hey.tex', ' do you no',function(err){
//     if(err) console.error(err);
//         else console.log("append files");
// })

// // rename 
// fs.rename('hey.tex','hello.txt',function(err){
//     if(err) console.error(err);
//     else console.log("Done ");
// })

// const http=require('http');
// const server =http.createServer(function(req,res){
//     res.end("hello world");

// })
// server.listen(3000);

const http=require("http");
const server=http.createServer(function(req,res){
    res.end("hello world");
})
server.listen(3000);
