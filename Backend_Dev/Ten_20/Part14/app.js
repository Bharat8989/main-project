const cookieParser = require('cookie-parser');
const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const jwt=require('jsonwebtoken')


app.use(cookieParser());
app.get('/',function(req,res){
    let token=jwt.sign({email:'bharatkadm@gmail.com'},'secret')
    res.cookie('token',token)
    res.send('done')
    console.log(token);

})
app.get('/read',function(req,res){

    jwt.verify(req.cookies.token,'secret')
    // console.log(req.cookies.token);
    console.log(data);
})

// app.use(cookieParser());

// // Root route for hashing password
// app.get('/', function (req, res) {
//     const plainPassword = 'polo'; // Example password to hash

//     // Generate salt and hash the password
//     bcrypt.genSalt(10, function (err, salt) {
//         if (err) {
//             console.error("Error generating salt:", err);
//             return res.status(500).send("Error generating salt");
//         }
//         bcrypt.hash(plainPassword, salt, function (err, hash) {
//             if (err) {
//                 console.error("Error hashing password:", err);
//                 return res.status(500).send("Error hashing password");
//             }
//             console.log("Generated Hash:", hash);
//             res.send(`Password hashed successfully: ${hash}`);
//         });
//     });
// });

// // Route to read cookies
// app.get('/read', function (req, res) {
//     console.log("Cookies:", req.cookies);
//     if (req.cookies) {
//         res.send(`Cookies received: ${JSON.stringify(req.cookies)}`);
//     } else {
//         res.send("No cookies found");
//     }
// });

app.listen(3000, function () {
    console.log("Server running on http://localhost:3000");
});
