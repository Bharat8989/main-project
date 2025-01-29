
const express=require('express')


const path=require('path')
// import { fileURLToPath } from 'url'; // Import to handle import.meta.url

// const { PORT } = require('./env');
const PORT=3000;


const app = express();
 

// Basic route 
app.get('/', (req, res) => {
  const homePagePath = path.join(__dirname, 'public', 'index.html');
  res.sendFile(homePagePath);
  // console.log(homePagePath)
  // console.log(__dirname)
  // console.log(__filename)
});
app.get('/profile/:username',(req,res)=>{
  res.send(`<h1>my user name  :${req.params.username}</h>`)
  console.log(req.params)
})

app.get('/product',(req,res)=>{
  console.log(req.query )
  res.send(`<h>product ${req.query.search} </h>`)
  // console.log(req.query )
})


app.get('/profile/:username/article/:slug',(req,res)=>{
  res.send(`<h1>my user name  :${req.params.username} and article by ${req.params.slug}</h>`)
  console.log(req.params)
})

app.use(express.static('public'))

// Start the server on the specified PORT
app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
