const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

// Set up EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Import Routes
const userRoutes = require("./router/user.router");

// Use Routes
app.use(userRoutes);
 
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
