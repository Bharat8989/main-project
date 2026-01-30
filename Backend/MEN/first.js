const http=require('http');

const server=http.createServer((req,res)=>{
   console.log(req.url, req.method,req.headers);
   process.exit();
  //  console.log(res)
   res.end("hello world");
   console.log("hello ")
})
server.listen(3000);