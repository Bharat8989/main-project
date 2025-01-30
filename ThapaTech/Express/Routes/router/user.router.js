console.log("routers");

const express = require("express");
const router = express.Router();



// console.log(students);
 
// Home Route (renders EJS view)

router.get("/", (req, res) => {
    res.render("index")
});
router.get("/reportCard", (req, res) => {
    const students = [
        {
            name: "Aarav Sharma",
            class: "10th",
            favoriteSubject: "Mathematics"
        },
        { 
            name: "Sneha Patil",
            class: "9th",
            favoriteSubject: "Science"
        },
        { 
            name: "Rohan Deshmukh",
            class: "11th",
            favoriteSubject: "Computer Science"
        }  
    ];
    
    // res.render("index", {students})
    // console.log(students)
  return res.render("report", { students })
 });


// Profile Route (sends plain HTML)
router.get("/profile", (req, res) => {
    res.render("profile")
 });

// Correct CommonJS export
module.exports = router;
