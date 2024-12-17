// console.log(module);
// console.log(globalThis.module);


// 
// file system module

// const fs=require('fs');
/** file system module 
 * read files 
 * create files 
 * delete files 
 * rename files
 */
// var http=require('http');
// var fs=require('fs');
// http.createServer(function(req,res){
//     fs.readFile('index.html',function(err,data){
//         res.writeHead(200,{'Content-Type':'text/html'});
//         res.write(data);
//         return res.end();
//     });

// }).listen(3000);

// const fs=require('fs');


// the build in URL module
var url=require('url');
const myURL = new URL('http://localhost:8080/default.htm?year=2017&month=february');

console.log(myURL.host);      // 'localhost:8080'
console.log(myURL.pathname);  // '/default.htm'
console.log(myURL.search);    // '?year=2017&month=february'
console.log(myURL.searchParams.get('month')); // 'february'