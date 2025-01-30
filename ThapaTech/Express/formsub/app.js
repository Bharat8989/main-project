// const express =require('express')
// const path=require('path')

// const app =express()



// app.get('/',(req,res)=>{
//     const staticPath=path.join(__dirname,"public");
//     res.sendFile(staticPath)
//     console.log(staticPath)
// })

// app.use(express.static(staticPath))

// app.listen(3000,(req,res)=>{
//     console.log("server staring on port :3000")
// })

const express = require('express');
const path = require('path');



const app = express();


app.use(express.urlencoded({extended:true}))
// Define static path globally
const staticPath = path.join(__dirname, 'public');
app.use(express.static(staticPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html')); // Serves the index.html file
    console.log("Serving index.html from:", staticPath);
});

// app.get('/contact',(req,res)=>{
//     console.log(req.query)
//     res.send("hell")
//     res.redirect('/')
// })

app.post('/contact',(req,res)=>{
    console.log(req.body)
    res.send("hell")
    // res.redirect('/')
})

//page not found message 

// app.use((req,res)=>{
//     return res.status(404).send(`<h1> page not found</h>`)
// })
app.use((req, res) => {
    res.status(404).sendFile(path.join(staticPath, '404.html')); // Serve the 404.html fil

})

app.listen(3000, () => {
    console.log("Server starting on port: 3000");
});
