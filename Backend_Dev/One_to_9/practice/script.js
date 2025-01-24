var http=require('http');
const fs=require('fs')

//asynchronous read
fs.readFile('hello.txt', 'utf-8',(err,data)=>{
    if(err) throw err;
    console.log('file content:',data)
})

const data=fs.readFileSync('hello1.txt','utf-8');
console.log('file content1:',data);


// http.createServer(function(req,res){
//     res.write('hello')
//     res.end()




// }).listen(3000)