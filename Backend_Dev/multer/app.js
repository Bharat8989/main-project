
const express=require("express")
const multer=require('multer')
const app=express();
const crypto=require('crypto')
const path=require('path')

app.set('view engine','ejs')
app.use(express.json())
// app.use(express.urlencoded({extended:true}))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      crypto.randomBytes(6,function(err,bytes){
        const fn=bytes.toString('hex') + path.extname(file.originalname)
        cb(null, fn)
      })
      
    }
  })
  
  const upload = multer({ storage: storage })

app.get('/',(req,res)=>{
    res.render('index')

});
app.post('/upload', upload.single('image'),(req,res)=>{
    // res.render('')
    console.log(req.file);

});

app.listen(3000,()=>{
    console.log("sever is running on http://localhost:3000/")
})

