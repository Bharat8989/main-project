/**
 * async operations 
 * 1 create(fs.writeFile)
 * 2 Read (fs.readFile)
 * 3 Update (fs.readFile)
 * 4 Delete (fs.unlink)
 * 
 */
const fs =require('fs')
const path=require('path')
// const fileName='fsAsync.txt';
// const filePath=path.join(__dirname,fileName);
const filePath=path.join(__dirname);

const writeF=fs.writeFile('fsAsync.txt','this is the initial data','utf-8',(err)=>{
    if(err) console.error(err);
    else console.log('files has been saved ')
})
console.log(writeF);

//read files

const readF=fs.readFile('fsAsync.txt','utf-8',(err,data)=>{
    if(err) console.error(err);
    else console.log(data)
})
console.log(readF);

//appendfile

const appendF=fs.appendFile('fsAsync.txt','\nthis is the update data','utf-8',(err)=>{
    if(err) console.error(err);
    else console.log('files has been update data ')
})
console.log(writeF);
console.log("hello world")