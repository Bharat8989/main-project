// Import required modules
const express = require("express");
const multerconfig = require("./config/multerconfig"); // Assuming this contains your Multer configurations
const Image = require("./models/image"); // Importing Mongoose model for image handling
const app = express();

app.set("view engine", "ejs"); // Setting EJS as the templating engine
app.use(express.json());

// Serve static files (useful for serving uploaded images)
app.use(express.static("public"));

// Home route to render the upload page
app.get("/", (req, res) => {
  res.render("index");
});

// Profile route to render the profile page and display the uploaded image
app.get("/profile", async (req, res) => {
  try {
    // Fetch the latest uploaded image from the database
    const userImage = await Image.findOne().sort({ _id: -1 }); // Fetch the last uploaded image
    const profilePic = userImage ? `/uploads/${userImage.profilepic}` : "/default.png"; // Fallback to default
    res.render("profile", { profilePic });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error loading profile.");
  }
});

// Upload route to handle file uploads
app.post("/upload", multerconfig.single("image"), async (req, res) => {
  try {
    // Check if the uploaded file exists
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    // Save the uploaded file's path to MongoDB
    const newImage = new Image({ profilepic: req.file.filename });
    await newImage.save();

    res.redirect("/profile"); // Redirect to profile after upload
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while uploading the file.");
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000/");
});
