// FileSystem
/** read ,write update ,delete and watch files 
 * CRUD Operations 
 * sync files using 
 * syntax :fs.writeFileSync(filePath,data,options);
 */
const fs=require('fs');
const   path=require('path');

const fileName='text.txt';

const filePath=path.join(__dirname,fileName);
console.log(__dirname);



//write files sync 
//fs.writeFileSync(path ,data ,encoding )

const writeFile1=fs.writeFileSync('index.txt', 'hello world','utf-8');
console.log(writeFile1);

//fs.readFileSync

const readFile=fs.readFileSync('index.txt' ,'utf-8');
console.log(readFile);

//fs.appendFileSync
//fs.appendFileSync(path ,data ,encoding);

const appendFile=fs.appendFileSync('index.txt',' hi am suraj','utf-8');
console.log(appendFile);

//fs.unlinkSync
//fs.unlinkSync(path);
const unlinkFile=fs.unlinkSync('index.txt');
console.log(unlinkFile);

// //fs.mkdirSync
// fs.mkdirSync('index.txt');

// //fs.rmdirSync
// fs.rmdirSync('index.txt');

